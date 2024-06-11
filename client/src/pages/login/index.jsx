import { useState } from "react";
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import FlexBetween from "../../components/FlexBetween";
import Authbar from "../../components/Authbar";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(null);
  const { login, error , isLoading}= useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
   <><Authbar>
    
   </Authbar>
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
          {formError && (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {formError}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            type="submit"
            disabled={isLoading}
          >
            Login
          </Button>
          {error && <div className="error">{error}</div>}
        </form>
      </Container></>
  )
}

export default Login;