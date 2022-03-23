import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Home } from "../Home";
import { Login } from '../Auth/Login'
import { Register } from '../Auth/Register';
import { Message } from '../Message/Message.jsx'
import { Profile } from '../User/Profile.jsx'
import { CreatePosts } from '../Posts/CreatePosts';

import {UserProvider} from '../../context/userContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Message />
        <Switch>
          <Route path="/posts/createpost">
            <CreatePosts></CreatePosts>
          </Route>
          <Route path="/users/profile">
            <Profile></Profile>
          </Route>
          <Route path="/users/register">
            <Register></Register>
          </Route>
          <Route path="/users/login">
            <Login></Login>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
