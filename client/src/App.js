import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import AuthState from './context/AuthState';
import { Navbar } from './layout/Navbar/Navbar';
import { Home } from './pages/Home';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </AuthState>
  );
};

export default App;
