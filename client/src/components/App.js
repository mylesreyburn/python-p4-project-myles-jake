import * as React from 'react';
import { Switch, Route, } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Card from './Card';
import { useEffect, useState } from 'react';
import SignIn from './SignIn';
import Profile from './Profile';
import Landing from './Landing';
import Character from './Character'
import Create from './Create'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [Allaccounts, setAccounts] = useState([])

  useEffect(() => {
    fetch('/all_characters')
    .then((r) => r.json())
    .then(setCharacters)
  }, []);

  async function logIn(enteredUser) {
    const resp = await fetch('/all_users');
    const accounts = await resp.json();
    setAccounts(accounts);
  
    const user = Allaccounts.find((account) => account.username === enteredUser.email && account.password === enteredUser.password);
    console.log(Allaccounts)
    if (user) {
      setIsLoggedIn(!isLoggedIn);
      setUserInfo(user);
    } else {
      setIsLoggedIn(!isLoggedIn);
      setUserInfo({});
    }
    console.log(isLoggedIn)
  }
  return (
    <div style={{ width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar isLoggedIn={isLoggedIn}/>
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
            <SignIn logIn={logIn}></SignIn>
          </Route>
          <Route exact path = "/profile">
            <Profile></Profile>
          </Route>
          <Route exact path = "/home">
            <Landing></Landing>
          </Route>
          <Route exact path = "/create">
            <Create></Create>
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;