import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

export default function ButtonAppBar({ user }) {
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

  function handleCreate() {
    history.push('/create');
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{m:1}}>
            Character Database
          </Typography>
          <Typography variant="h6" component="div" sx={{m:1}}>
            |
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
              <Button onClick={handleCreate}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Create
              </Button>
          </Box>
          {user ? <Button color="inherit">logout</Button> : <Button color="inherit" onClick={handleLogin}>login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}