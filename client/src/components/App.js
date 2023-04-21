import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Card from './Card';
import { useEffect, useState } from 'react';
import SignIn from './SignIn';
import Profile from './Profile';
import Landing from './Landing';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [{ data: characters, error, status }, setCharacters] = useState({
    data: null,
    error: null,
    status: 'pending',
  });

  useEffect(() => {
    fetch('/all_characters').then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setCharacters({ data: data, error: null, status: 'resolved' });
        });
      } else {
        r.json().then((err) => {
          setCharacters({ data: null, error: err.error, status: 'rejected' });
        });
      }
    });
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route exact path="/characters">
            {status === 'pending' && <div>Loading...</div>}
            {status === 'rejected' && <div>Error: {error}</div>}
            {status === 'resolved' && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '10px',
                }}
              >
                {characters.map((character) => (
                  <Card character={character} key={character.id} />
                ))}
              </div>
            )}
          </Route>
          <Route exact path ="/login">
            <SignIn></SignIn>
          </Route>
          <Route exact path = "/profile">
            <Profile></Profile>
          </Route>
          <Route exact path = "/home">
            <Landing></Landing>
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;