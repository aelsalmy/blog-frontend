import { Container } from '@mui/material'
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Container maxWidth={false} sx={{width: "100%" , height:"100%"}}>
        <LoginPage />
      </Container>
    </>
  )
}

export default App
