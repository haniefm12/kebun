// Signup.js
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import FlexBetween from "../../components/FlexBetween";
import Authbar from "../../components/Authbar";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
  };

  const validatePassword = () => {
    if (password !== retypePassword) {
      setError('Passwords do not match');
    } else {
      setError(null);
    }
  };

  return (
    <><Authbar>
      
    </Authbar>
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
            onChange={(e) => setName(e.target.value)} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
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
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Retype Password"
            variant="outlined"
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            onBlur={validatePassword} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} />
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
          Sign Up
        </Button>
      </form>
    </Container></>
  );
};

export default Signup;