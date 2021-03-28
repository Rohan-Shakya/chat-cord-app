import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import Navbar from './layout/Navbar/Navbar';
import Home from './pages/Home';
import PrivateRoute from './routing/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileUpdate from './components/ProfileUpdate/ProfileUpdate';
import Chat from './pages/Chat';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/me/avatar' exact component={ProfileUpdate} />
        <Route path='/chat' exact component={Chat} />
      </Switch>
    </Router>
  );
};

export default App;
