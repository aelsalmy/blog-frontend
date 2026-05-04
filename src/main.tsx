import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/user.context.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import './utils/auth/authReq.interceptors'
import './utils/auth/authResp.interceptors'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
