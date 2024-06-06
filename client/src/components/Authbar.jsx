import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  
} from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import FlexBetween from "./FlexBetween";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { AppBar, IconButton, Toolbar, useTheme, Box } from "@mui/material";
import { useLocation } from 'react-router-dom';

const getLocationBasedButtonText = (pathname) => {
  switch (pathname) {
    case '/login':
      return 'Sign Up';
    case '/signup':
      return 'Login';
    default:
      return null;
  }
};

const Authbar= () =>{
const location = useLocation();
const buttonText = getLocationBasedButtonText(location.pathname);

const dispatch = useDispatch();
const theme = useTheme();
  return (
    <Box sx={{ 
      flexGrow: 1, 
      }}>
      <AppBar 
      sx={{
        position: "static",
        background: theme.palette.primary.main,
        // boxShadow: "none",
      }}
     
      >
        <Toolbar>
          
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            KEBUN
          </Typography>
          <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          </FlexBetween>
          <Button color="inherit">{buttonText}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Authbar;
