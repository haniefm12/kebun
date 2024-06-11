import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import Authbar from "../../components/Authbar";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  // State variables for email, password, and form error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  // State variable to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook to handle login functionality
  const { login, error, isLoading } = useLogin();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  // Function to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Authbar>{/* Authbar component */}</Authbar>
      <FlexBetween>{/* FlexBetween component */}</FlexBetween>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
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
      </Container>
    </>
  );
};

export default Login;
