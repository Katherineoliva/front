import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="543241057978-2nf3g9u6su9ol04h4le40fpu8phpc4g3.apps.googleusercontent.com">
    <AuthProvider>
      <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
