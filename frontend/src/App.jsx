import { Routes, Route, Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { api } from './api';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePage,
  changeRowsPerPage,
  generateDiscountCode,
} from './redux/discountCodesSlice';
import { registerFailure, registerSuccess } from './redux/registerSlice';
import { loginFailure, loginSuccess } from './redux/authSlice';

export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: 'calc(100% - 480px)',
        margin: '0 auto',
      }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='discount-codes' element={<DiscountCodes />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </Box>
  );
}

const Nav = styled('nav')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const NavList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
});

const NavItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(1),
}));

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const Sidebar = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: theme.spacing(1, 3),
  marginLeft: theme.spacing(2),
  borderColor: theme.palette.disabled.main,
  '& .MuiButton-outlined': {
    textColor: 'black',
  },
}));

function Layout() {
  const [open, setOpen] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Nav>
        <NavList>
          <NavItem
            sx={{
              marginLeft: '40px',
            }}
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </NavItem>
        </NavList>
      </Nav>

      <Sidebar variant='persistent' open={open}>
        <NavList>
          <NavItem>
            <NavLink to='/'>Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/discount-codes'>Discount Codes</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to='/register'>Register</NavLink>
          </NavItem>
          <NavItem>
            {auth.isLoggedIn && (
              <NavLink to='/' onClick={dispatch(loginFailure)}>
                Logout
              </NavLink>
            )}
          </NavItem>
        </NavList>
      </Sidebar>

      {/* <hr /> */}

      <Outlet />
    </div>
  );
}

function createData() {
  const code = Math.random().toString(36).substring(7);
  const status = Math.random() < 0.5 ? 'Active' : 'Inactive';
  const action = Math.random() < 0.5 ? 'Mark as used' : 'Delete';
  return { code, status, action };
}

// const rows = Array.from(Array(14), createData);

function DiscountCodes() {
  const [discountCodes, setDiscountCodes] = useState([]);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { codes, page, rowsPerPage } = useSelector(
    (state) => state.discountCodes
  );

  useEffect(() => {
    const response = api
      .get('/discount-codes', {
        headers: {
          Authorization: `Bearer ${auth.authToken}`,
        },
      })
      .then((response) => {
        console.log(response.codes);
        setDiscountCodes(response.codes);
      })
      .catch((e) => {
        console.log(`Error = ${e}`);
      });
  }, []);

  const rows = discountCodes ?? Array.from(Array(14), createData);

  const handleChangePage = (event, newPage) => {
    dispatch(changePage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(changeRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleGenerateDiscountCode = () => {
    console.log(auth.authToken);
    const response = api
      .post(
        '/discount-codes/generate',
        {
          amount: 5,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.auth}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
    {
      dispatch(generateDiscountCode());
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {}, []);

  return (
    <Box
      sx={{
        width: '960px',
        margin: '0 auto auto 90px',
      }}
      elevation={3}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: '16px',
          width: '100%',
        }}
      >
        <Box>
          <h2>Discount Codes</h2>
        </Box>
        <TextField
          margin='normal'
          variant='outlined'
          name='enterAmount'
          placeholder='Enter amount'
          hiddenLabel={true}
          size='small'
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#F9FBFF',
              border: 'none',
              marginLeft: '18em',
            },
          }}
        />
        <StyledButton
          variant='outlined'
          color='primary'
          onClick={handleGenerateDiscountCode}
        >
          Generate
        </StyledButton>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow hover key={row.code} sx={{ 'td, th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.code}
                </TableCell>
                <TableCell align='right'>{row.status}</TableCell>
                <TableCell align='right'>{row.action}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={23}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (auth.isLoggedIn) {
      setSuccessMessage(`You are logged in as ${auth.username}`);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/discount-codes');
      }, 4000);
    }
  }, [auth, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', formData);
      console.log(JSON.stringify(response));

      if (response.status === 200) {
        const token = response.data.access_token;

        // Store the token securely
        document.cookie = `token=${token}`;

        dispatch(
          loginSuccess({
            username: formData.username,
            authToken: token,
          })
        );

        setSuccessMessage('Successfully logged in!');
        setErrorMessage('');

        // Redirect to the discount codes page after a light delay.
        setTimeout(() => {
          navigate('/discount-codes');
        }, 2000);

        console.log(response.data.access_token);
      }
      setFormData({ username: '', password: '' });
    } catch (error) {
      dispatch(
        loginFailure({
          error: error.response?.data?.message || 'Error logging in',
        })
      );
      setErrorMessage(error.response?.data?.message || 'Error logging in');
      setSuccessMessage('');
    }
  };

  console.log(auth.isLoggedIn);
  return (
    <Container maxWidth='sm'>
      <h2>Login</h2>

      {auth.isLoggedIn && (
        <>
          <div
            style={{ color: 'green' }}
          >{`Logged in as ${auth.username}`}</div>
          <br />
          <div>Redirecting ...</div>
        </>
      )}

      {!auth.isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin='normal'
            label='Username'
            variant='outlined'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin='normal'
            label='Password'
            variant='outlined'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />

          {successMessage && (
            <div style={{ color: 'green' }}>{successMessage}</div>
          )}
          {errorMessage && (
            <>
              <div style={{ color: 'red' }}>{errorMessage}</div>
              <div>
                You may <Link to='/register'>register</Link> first^^
              </div>
            </>
          )}

          <Button
            fullWidth
            variant='contained'
            color='primary'
            type='submit'
            style={{ marginTop: '16px' }}
            disabled={auth.isLoggedIn}
          >
            {auth.isLoggedIn ? 'Logged In' : 'Login'}
          </Button>
        </form>
      )}
    </Container>
  );
}

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    brandName: '',
  });

  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/register', formData);
      if (response.status === 201) {
        dispatch(
          registerSuccess({
            username: formData.username,
            success: 'Registration successful!',
          })
        );

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      setFormData({ username: '', password: '', brandName: '' });
    } catch (error) {
      dispatch(
        registerFailure({
          error: error.response?.data?.message || 'Error registering',
        })
      );
    }
  };

  return (
    <Container maxWidth='sm'>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin='normal'
          label='Username'
          variant='outlined'
          name='username'
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin='normal'
          label='Password'
          variant='outlined'
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin='normal'
          label='Brand Name'
          variant='outlined'
          name='brandName'
          value={formData.brandName}
          onChange={handleChange}
        />

        {register.success && (
          <div style={{ color: 'green' }}>{register.success}</div>
        )}
        {register.error && <div style={{ color: 'red' }}>{register.error}</div>}

        <Button
          fullWidth
          variant='contained'
          color='primary'
          type='submit'
          style={{ marginTop: '16px' }}
        >
          Register
        </Button>
      </form>
    </Container>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Not found!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
