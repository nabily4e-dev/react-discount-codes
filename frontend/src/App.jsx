import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useState } from "react";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "./api";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DiscountCodes />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Discount Codes</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function DiscountCodes() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    brandName: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);
      if (response.status === 201) {
        setSuccessMessage("Successfully registered!");
        setErrorMessage("");
      }
      setFormData({ username: "", password: "", brandName: "" });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error registering");
      setSuccessMessage("");
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Brand Name"
          variant="outlined"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
        />

        {successMessage && (
          <div style={{ color: "green" }}>{successMessage}</div>
        )}
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "16px" }}
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
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
