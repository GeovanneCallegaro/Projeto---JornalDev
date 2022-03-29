import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Home } from "../Home";
import { Login } from '../Auth/Login'
import { Register } from '../Auth/Register';
import { Message } from '../Message/Message.jsx'
import { Profile } from '../User/Profile.jsx'
import { CreatePosts } from '../Posts/CreatePosts';
import { MyPosts } from '../Posts/MyPosts';
import { EditPosts } from '../Posts/EditPosts';
import { Dashboard } from '../Admin/Dashboard/index';
import { EditUser } from '../Admin/EditUser';

import {UserProvider} from '../../context/userContext'
import { NotFound } from '../layout/notFound';

function App() {
  return (
    <Router>
      <UserProvider>
        <Message />
        <Switch>
          <Route path="/admin/user/edit/:id">
            <EditUser></EditUser>
          </Route>
          <Route path="/admin/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/posts/editpost/:id">
            <EditPosts></EditPosts>
          </Route>
          <Route path="/posts/myposts">
            <MyPosts></MyPosts>
          </Route>
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
          <Route path="/notfound">
            <NotFound></NotFound>
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
