import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from "react-router-dom";

export default function ButtonAppBar() {
  const history = useHistory();

  function handleChar() {
    history.push('/characters');
  }

  function handleLogin() {
    history.push('/login');
  }

  function handleProfile() {
    history.push('/profile');
  }

  function handleHome() {
    history.push('/home');
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{m:1}}>
            WEBSITE NAME
          </Typography>
          <Box sx={{ flexGrow: 1, l: 5, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={handleHome}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button onClick={handleChar}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Characters
              </Button>
          </Box>
          <Button color="inherit" onClick={handleLogin}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}