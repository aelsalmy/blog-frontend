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
import { RoleProtectedRoute } from './utils/routes/RoleProtectedRoute'
import { ROLES } from './constants/roles'
import { Layout } from './pages/Layout'

function App() {
  return (
    <>
      <Container maxWidth={false} sx={{width: "100%" , height:"100%"}}>
        <Layout>
          <Routes>

            //Public Routes accessed by anyone even if they are not authenticated
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            
            //Protected Routes accessed by users or admins that are authenticated
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<ProfilePage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Route>

            //Routes accessed by admins only
            <Route element={<RoleProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

          </Routes>
        </Layout>
      </Container>
    </>
  )
}

export default App
