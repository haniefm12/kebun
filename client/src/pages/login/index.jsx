import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import FlexBetween from "../../components/FlexBetween";
import Authbar from "../../components/Authbar";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
  }

  return (
   <><Authbar></Authbar>
   <FlexBetween></FlexBetween>
   <Container maxWidth="xs" sx={{ py: 20 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Box>
          {error && (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
          >
            Login
          </Button>
        </form>
      </Container></>
  )
}

export default Login;