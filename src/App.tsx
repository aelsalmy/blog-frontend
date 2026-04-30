import { Container } from '@mui/material'
import './App.css'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { ProfilePage } from './pages/ProfilePage'
import { AdminPage } from './pages/AdminPage'
import { BlogPage } from './pages/BlogPage'
import { ProtectedRoutes } from './utils/routes/ProtectedRoutes'
import { PublicRoutes } from './utils/routes/PublicRoutes'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  return (
    <>
      <Container maxWidth={false} sx={{width: "100%" , height:"100%"}}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Route>

        </Routes>
      </Container>
    </>
  )
}

export default App
