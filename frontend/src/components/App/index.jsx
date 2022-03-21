import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Home } from "../Home";
import { Login } from '../Auth/Login'
import { Register } from '../Auth/Register';
import { Message } from '../Message/Message.jsx'

import {UserProvider} from '../../context/userContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Message />
        <Switch>
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
