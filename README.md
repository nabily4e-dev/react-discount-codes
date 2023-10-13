# **Discount Codes**

You have two folders:

`backend`: You need to run the server to be able to integrate the frontend with the backend API.

`frontend`: You will be working here.

## Backend Docs

Make sure to run these commands after you navigate to the backend folder by running the command: `cd backend`

### **Installation**

```bash
npm install
```

### **Running the server**

```bash
npm run dev
```

The server will be running by default on: [http://localhost:3000](http://localhost:3000)

### Swagger Documentation

Once the server is running, you can view the Swagger documentation in the page:

[http://localhost:3000/api](http://localhost:3000/api#/)

### **Endpoints**

1. Register account `POST /auth/register`

2. Login and retrieve access token `POST /auth/login`

3. Get Discount Codes List `GET /discount-codes`

4. Generate Discount Codes `POST /discount-codes/generate`

5. Mark a discount code as used `POST /discount-codes/mark-as-used`

### **Security**

All the endpoints (except **`/auth/register`** and **`/auth/login`**) require a JWT (JSON Web Token) for authentication. The JWT should be passed as a bearer token in the header of the request.

You can also pass the token using Swagger for testing.

### Accounts

You can use these pre-registered accounts:
```
username: john
password: 123

username: maria
password: 123
```

## Frontend Docs

Make sure to run these commands after you navigate to the backend folder by running the command: `cd frontend`

### **Installation**

```bash
npm install
```

### **Running the app**

```bash
npm run dev
```