import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Home } from "../Home";
import { Login } from '../Auth/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users/login">
          <Login></Login>
        </Route>
        <Route path="/">
        <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
