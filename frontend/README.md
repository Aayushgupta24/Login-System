# React Frontend for Login System

This is the React.js frontend for the Secure Authentication System.

## 🚀 Getting Started

### Install Dependencies

```bash
cd frontend
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

This will build the React app and output to the `../public` directory, which will be served by the backend.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Login.jsx           # Login page
│   │   └── Dashboard.jsx       # Protected dashboard
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### API URL

The frontend is configured to use `/api` as the base URL by default. This works when:
- Running locally with the proxy (dev mode)
- Deployed on the same domain as the backend

To change the API URL, create a `.env` file:

```env
VITE_API_URL=https://your-api-url.com/api
```

## 🎨 Features

- ✅ React Router for navigation
- ✅ Authentication context for state management
- ✅ Protected routes
- ✅ API integration with axios
- ✅ Cookie-based authentication
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM renderer
- **react-router-dom** - Routing
- **axios** - HTTP client
- **vite** - Build tool

## 🚀 Deployment

The frontend is built and served from the `public` directory by the backend server. When you run `npm run build`, the output goes to `../public`, which is then served by Express.

For Vercel deployment, the build process is handled automatically.

