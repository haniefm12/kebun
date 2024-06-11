// Signup.js
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import FlexBetween from "../../components/FlexBetween";
import Authbar from "../../components/Authbar";
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formError, setFormError] = useState(null);

  const{signup,error,isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password, phoneNumber)
  };

  const validatePassword = () => {
    if (password !== retypePassword) {
      setFormError('Passwords do not match');
    } else {
      setFormError(null);
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
        {error && <div className='error'>{error}</div>}
      </form>
    </Container></>
  );
};

export default Signup;