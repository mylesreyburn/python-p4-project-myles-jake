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

export default function Create() {
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const newChar = {
      name: data.get('name'),
      age: data.get('name'),
      race: data.get('race'),
      gender: data.get('gender'),
      image_1: data.get('image1'),
      image_2: data.get('image2'),
      bio_1: data.get('bio'),
      bio_2: data.get('bio2'),
    };
    fetch("/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChar),
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
            Create Character
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
            />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="race"
                  label="Race"
                  name="race"
                  autoComplete="race"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  label="Gender"
                  type="gender"
                  id="gender"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="image1"
                  label="Image 1"
                  type="image1"
                  id="image1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="image2"
                  label="Image 2"
                  type="image2"
                  id="image2"
                />
              </Grid>
              <Grid item xs={200}>
                <TextField
                  required
                  fullWidth
                  name="bio"
                  label="Bio"
                  type="bio"
                  id="bio"
                />
              </Grid>
              <Grid item xs={200}>
                <TextField
                  required
                  fullWidth
                  name="bio2"
                  label="Bio 2"
                  type="bio2"
                  id="bio2"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Character
            </Button>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}