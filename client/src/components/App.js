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
import Character from './Character'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('/all_characters')
    .then((r) => r.json())
    .then(setCharacters)
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route path="/characters">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 5fr)',
                  gap: '10px',
                }}
              >
                {characters.map((character) => (
                  <Card character={character} key={character.id} />
                ))}
              </div>
          </Route>
          <Route path="/character/:id">
                  <Character></Character>
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