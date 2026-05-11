import { Container } from '@mui/material'
import './App.css'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import { ProfilePage } from './pages/ProfilePage'
import { ProtectedRoutes } from './utils/routes/ProtectedRoutes'
import { PublicRoutes } from './utils/routes/PublicRoutes'
import { RegisterPage } from './pages/RegisterPage'
import { RoleProtectedRoute } from './utils/routes/RoleProtectedRoute'
import { ROLES } from './constants/roles'
import { Layout } from './pages/Layout'
import { FeedPage } from './pages/FeedPage'
import { MyPostsPage } from './pages/MyPostsPage'
import { PostForm } from './pages/PostForm'
import { ApprovePostsPage } from './pages/ApprovePosts'

function App() {
  return (
    <>
      <Container maxWidth={false} sx={{width: "100%" , height:"100%"}}>
        <Layout>
          <Routes>

            {/* Routes accessed by anyone even if they are not authenticated */}
            <Route path="/feed" element={<FeedPage />} />


            {/* Public Routes accessed by users that are not authenticated */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            
            //Protected Routes accessed by users or admins that are authenticated
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<ProfilePage />} />
              <Route path="/posts" element={<MyPostsPage />}/>
              <Route path="/posts/create" element={<PostForm />}/>
            </Route>

            //Routes accessed by admins only
            <Route element={<RoleProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin" element={<ApprovePostsPage />} />
            </Route>

          </Routes>
        </Layout>
      </Container>
    </>
  )
}

export default App
