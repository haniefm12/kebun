// Signup.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Authbar from "../../components/Authbar";
import { useSignup } from "../../hooks/useSignup";
import Visibility from "@mui/icons-material/Visibility"; // import Visibility icon
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // import VisibilityOff icon

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formError, setFormError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility
  const [showRetypePassword, setShowRetypePassword] = useState(false); // toggle retype password visibility

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, email, password, phoneNumber);
  };

  const validatePassword = () => {
    if (password !== retypePassword) {
      setFormError("Passwords do not match");
    } else {
      setFormError(null);
    }
  };

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword); // toggle showPassword state
  };

  const handleToggleShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassword); // toggle showRetypePassword state
  };

  return (
    <>
      <Authbar></Authbar>
      <FlexBetween></FlexBetween>
      <Container maxWidth="xs" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"} // toggle password type based on showPassword state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Retype Password"
              variant="outlined"
              type={showRetypePassword ? "text" : "password"} // toggle retype password type based on showRetypePassword state
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              onBlur={validatePassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleShowRetypePassword}>
                      {showRetypePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
            Sign Up
          </Button>
          {error && <div className="error">{error}</div>}
        </form>
      </Container>
    </>
  );
};

export default Signup;
