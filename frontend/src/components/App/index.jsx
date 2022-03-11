import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Home } from "../Home";
import { Login } from '../Auth/Login'

import {UserProvider} from '../../context/userContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
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
