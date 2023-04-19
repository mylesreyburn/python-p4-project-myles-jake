import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from './Card.js';
import Box from '@mui/material/Box';
import Navbar from './Navbar.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  // Code goes here!
  return (
    <div style={{ width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar></Navbar>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      </Box>
      </ThemeProvider>
    </div>
  )
}

export default App;
