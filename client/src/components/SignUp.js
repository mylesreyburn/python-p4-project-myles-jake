import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export default function SignUp({ setUser }) {
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const new_user = {
      username: data.get('username'),
      password: data.get('password'),
      profile_image: data.get('avatar')
    };
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_user)
    }).then(res => {
        if (res.ok) {
            res.json().then( new_user => setUser(new_user))
            console.log('User successfully created!')
        } else {
            res.json().then( err => {
                console.log(err)
                alert('Username is already taken!')
            })
        }
    }).catch(err => {
        console.error('Error during fetch:', err);
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs" sx={{
        mt: 50,
        border: 1,
        borderColor: 'grey.500',
        borderRadius: '16px'
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  name="displayname"
                  required
                  fullWidth
                  id="displayname"
                  label="displayname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="avatar"
                  label="avatar"
                  name="avatar"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}