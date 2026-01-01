# Secure User Authentication System

A comprehensive, secure user authentication system built with Node.js, Express, MongoDB, JWT, and modern security best practices.

## 🚀 Features

- ✅ **User Registration** - Secure sign-up with email/username and password
- ✅ **User Login** - JWT-based authentication with cookie storage
- ✅ **Protected Routes** - Access control for authenticated users
- ✅ **Password Security** - bcrypt hashing with salt rounds
- ✅ **JWT Tokens** - Secure token-based authentication
- ✅ **Cookie-based Sessions** - HttpOnly, Secure, SameSite cookies
- ✅ **Input Validation** - Express-validator for data validation
- ✅ **Security Protection** - XSS, injection attacks, rate limiting
- ✅ **Error Handling** - Comprehensive error handling throughout

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "Login System"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   MONGODB_URI=mongodb://localhost:27017/auth_system
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=7d
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - If using local MongoDB, ensure it's running:
     ```bash
     mongod
     ```
   - Or use MongoDB Atlas and update `MONGODB_URI` in `.env`

5. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
Login System/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── security.js          # Security middleware (helmet, rate limiting, etc.)
├── models/
│   └── User.js              # User schema with password hashing
├── routes/
│   ├── auth.js              # Authentication routes (register, login, logout)
│   └── protected.js         # Protected routes
├── utils/
│   └── generateToken.js     # JWT token generation
├── public/
│   ├── index.html           # Home page
│   ├── register.html        # Registration page
│   ├── login.html           # Login page
│   ├── dashboard.html       # Protected dashboard
│   ├── styles.css           # Styling
│   └── app.js               # Frontend JavaScript
├── server.js                # Express server setup
├── package.json             # Dependencies
└── README.md                # Documentation
```

## 🔐 Security Features

### 1. Password Security
- **bcrypt hashing**: Passwords are hashed with bcrypt using 12 salt rounds
- **Password requirements**: Minimum 8 characters with uppercase, lowercase, and number
- **No password storage**: Passwords are never stored in plain text

### 2. JWT Authentication
- **Token generation**: JWT tokens contain only user ID (no sensitive data)
- **Token expiration**: Configurable expiration (default: 7 days)
- **Secure storage**: Tokens stored in HttpOnly cookies

### 3. Cookie Security
- **HttpOnly**: Prevents JavaScript access (XSS protection)
- **Secure**: HTTPS only in production
- **SameSite**: Strict mode for CSRF protection
- **Expiration**: 7-day expiration

### 4. Input Validation & Sanitization
- **Express-validator**: Validates and sanitizes all user inputs
- **MongoDB sanitization**: Prevents NoSQL injection attacks
- **XSS protection**: xss-clean library sanitizes inputs
- **Email validation**: Proper email format validation
- **Username validation**: Alphanumeric and underscore only

### 5. Rate Limiting
- **Auth routes**: 5 requests per 15 minutes per IP
- **General routes**: 100 requests per 15 minutes per IP
- Prevents brute force attacks

### 6. Security Headers
- **Helmet.js**: Sets various HTTP headers for security
- **Content Security Policy**: Prevents XSS attacks
- **CORS**: Configured for secure cross-origin requests

## 📡 API Endpoints

### Public Endpoints

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

#### POST `/api/auth/login`
Login with email/username and password.

**Request Body:**
```json
{
  "login": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

#### POST `/api/auth/logout`
Logout the current user.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET `/api/auth/me`
Get current authenticated user information.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
}
```

### Protected Endpoints

#### GET `/api/protected/dashboard`
Access protected dashboard (requires authentication).

**Headers:** Cookie with JWT token

**Response:**
```json
{
  "success": true,
  "message": "Welcome to the protected dashboard!",
  "data": {
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "message": "This is a protected route. Only authenticated users can access this."
  }
}
```

## 🎨 Frontend Pages

1. **Home (`/`)**: Welcome page with system overview
2. **Register (`/register.html`)**: User registration form
3. **Login (`/login.html`)**: User login form
4. **Dashboard (`/dashboard.html`)**: Protected dashboard showing user information

## 🔒 Security Best Practices Implemented

1. **Password Hashing**: bcrypt with 12 salt rounds
2. **JWT Tokens**: Secure token generation without sensitive data
3. **HttpOnly Cookies**: Prevents XSS attacks
4. **Input Validation**: All inputs validated and sanitized
5. **Rate Limiting**: Prevents brute force attacks
6. **MongoDB Sanitization**: Prevents NoSQL injection
7. **XSS Protection**: Input sanitization
8. **Security Headers**: Helmet.js for HTTP headers
9. **Error Handling**: No sensitive information leaked in errors
10. **CORS Configuration**: Secure cross-origin requests

## 🐛 Error Handling

The system handles various error scenarios:

- **Duplicate Users**: Returns 400 with appropriate message
- **Invalid Credentials**: Returns 401 without revealing which field is wrong
- **Validation Errors**: Returns 400 with detailed validation messages
- **Missing Token**: Returns 401 for protected routes
- **Invalid Token**: Returns 401 with appropriate message
- **Server Errors**: Returns 500 with generic message (detailed in development)

## 🧪 Testing the System

1. **Register a new user:**
   - Go to `/register.html`
   - Fill in username, email, and password
   - Submit the form

2. **Login:**
   - Go to `/login.html`
   - Use email or username and password
   - Submit the form

3. **Access protected route:**
   - After login, go to `/dashboard.html`
   - You should see your user information

4. **Test error handling:**
   - Try registering with duplicate email/username
   - Try logging in with wrong password
   - Try accessing dashboard without login

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## 🚀 Production Deployment

Before deploying to production:

1. **Change JWT_SECRET**: Use a strong, random secret key
2. **Set NODE_ENV**: Set to `production`
3. **Update CORS**: Configure `FRONTEND_URL` in `.env`
4. **Use HTTPS**: Ensure secure cookies work properly
5. **MongoDB Atlas**: Use MongoDB Atlas or secure MongoDB instance
6. **Environment Variables**: Use secure environment variable management

## 📚 Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - JWT (jsonwebtoken)
  - bcryptjs
  - express-validator
  - helmet
  - express-rate-limit
  - express-mongo-sanitize
  - xss-clean
  - cookie-parser
  - cors

- **Frontend:**
  - HTML5
  - CSS3
  - Vanilla JavaScript

## 🤝 Design Decisions

### Why bcrypt?
- Industry standard for password hashing
- Adaptive hashing with configurable cost
- Protection against rainbow table attacks

### Why JWT in Cookies?
- HttpOnly cookies prevent XSS attacks
- Automatic cookie handling by browsers
- No need for client-side token storage
- SameSite attribute prevents CSRF

### Why Express-validator?
- Popular and well-maintained
- Comprehensive validation rules
- Built-in sanitization
- Easy to use and extend

### Why Rate Limiting?
- Prevents brute force attacks
- Protects against DDoS
- Configurable per route

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Built as a secure authentication system demonstration.

---

**Note**: This is a demonstration system. For production use, consider additional security measures like:
- Two-factor authentication (2FA)
- Email verification
- Password reset functionality
- Session management
- Audit logging
- Additional monitoring and alerting

