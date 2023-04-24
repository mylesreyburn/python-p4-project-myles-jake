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
import SignUp from './SignUp'
import EditProfile from './EditProfile';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const history = useHistory();
  const [characters, setCharacters] = useState([]);
  const [user, setUser] = useState();
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('/characters')
    .then((r) => r.json())
    .then(setCharacters)
  }, []);
  useEffect(() => {
    fetch("/comments")
      .then((response) => response.json())
      .then((data) => setComments(data))
},[]);

console.log(comments)

useEffect(() => {
  fetch("/check_session")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        console.log(user)
      }
    });
}, []);

const handleLogout = () => {
  fetch("/logout", { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        setUser(undefined)
      }
      history.push('/home')
    })
}

  return (
    <div style={{ width: '100%' }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar user={user}/>
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
                  <Character comments={comments}></Character>
          </Route>
          <Route exact path ="/login">
            <SignIn setUser={setUser}></SignIn>
          </Route>
          <Route exact path = "/profile">
            <Profile logout={handleLogout} user={user} setUser={setUser}></Profile>
          </Route>
          <Route exact path = "/home">
            <Landing></Landing>
          </Route>
          <Route exact path = "/create">
            <Create></Create>
          </Route>
          <Route exact path = "/signup">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/edit">
            <EditProfile></EditProfile>
          </Route>
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;