# 🧾 API Documentation

## 👤 User API Spec

> 🔍 Version: `1.0.0`  
> 🛠️ Built with: **Express.js**, **Prisma ORM**, **MySQL**  
> 🚀 Runtime: **Node.js v18+ (ESM)**

---

### 🧑‍💻 Register User API

📌 **Endpoint:** `/api/users`  
📬 **Method:** `POST`  
🔒 **Authentication:** Not required (Public)

#### 🧾 Description

This endpoint is used to register a new user into the system.

#### 📥 Request Body

```json
{
  "username": "Hajuenter",
  "password": "belajar123",
  "name": "ACH. BAHRUL MA'ARIP"
}
```

| Field    | Type   | Required | Description                      |
| -------- | ------ | -------- | -------------------------------- |
| username | string | Yes      | Must be unique, min 3 characters |
| password | string | Yes      | Min 6 characters                 |
| name     | string | Yes      | Full name of the user            |

### Success response

✅ Response: 200 OK

```json
{
  "data": {
    "username": "Hajuenter",
    "name": "ACH. BAHRUL MA'ARIP"
  }
}
```

### Error response

⚠️ Response: 400 Bad Request

```json
{
  "status": 400,
  "message": "Validation Error",
  "errors": {
    "username": ["username is not allowed to be empty"],
    "password": ["password is not allowed to be empty"],
    "name": ["name is not allowed to be empty"]
  }
}
```

---

### 🔐 Login User API

📌 **Endpoint:** `/api/users/login`  
📬 **Method:** `POST`  
🔒 **Authentication:** Not required (Public)

#### 🧾 Description

This endpoint is used to login.

#### 📥 Request Body

```json
{
  "username": "Hajuenter",
  "password": "belajar123"
}
```

| Field    | Type   | Required | Description      |
| -------- | ------ | -------- | ---------------- |
| username | string | Yes      | Min 3 characters |
| password | string | Yes      | Min 6 characters |

### Success response

✅ Response: 200 OK

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

### Error response

⚠️ Response: 401 Unauthorized

```json
{
  "status": 401,
  "message": "Username or password wrong",
  "errors": "Username or password wrong"
}
```

---

### 📝 Update User API

📌 **Endpoint:** `/api/users/current`  
📬 **Method:** `PATCH`  
🔒 **Authentication:** Token

#### 🧾 Description

This endpoint is used to update a user.

#### 📥 Request Body

```json
{
  "name": "Hajuenter Lagi", // optional
  "password": "new password" // optional
}
```

| Field    | Type   | Required | Description           |
| -------- | ------ | -------- | --------------------- |
| name     | string | Yes      | Full name of the user |
| password | string | Yes      | Min 6 characters      |

### Success response

✅ Response: 200 OK

```json
{
  "data": {
    "username": "Hajuenter update",
    "name": "ACH. BAHRUL MA'ARIP new"
  }
}
```

### Error response

⚠️ Response: 400 Bad Request

```json
{
  "status": 400,
  "message": "Validation Error",
  "errors": {
    "password": ["password length must be at least 6 characters long"]
  }
}
```

---

### 👤 Get User API

📌 **Endpoint:** `/api/users/current`  
📬 **Method:** `GET`  
🔒 **Authentication:** Token

#### 🧾 Description

This endpoint is used to get a user.

### Success response

✅ Response: 200 OK

```json
{
  "data": {
    "username": "Hajuenter",
    "name": "ACH. BAHRUL MA'ARIP"
  }
}
```

### Error response

⚠️ Response: 401 Unauthorized

```json
{
  "status": 401,
  "message": "Unauthorized",
  "errors": "Unauthorized"
}
```

---

### 🔒 Logout User API

📌 **Endpoint:** `/api/users/logout`  
📬 **Method:** `DELETE`  
🔒 **Authentication:** Token

#### 🧾 Description

This endpoint is used to get a user.

### Success response

✅ Response: 200 OK

```json
{
  "data": "Success"
}
```

### Error response

⚠️ Response: 401 Unauthorized

```json
{
  "status": 401,
  "message": "Unauthorized",
  "errors": "Unauthorized"
}
```
