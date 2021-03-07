import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/AuthState';
import { Navbar } from './layout/Navbar/Navbar';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <Navbar />
      </Router>
    </AuthState>
  );
};

export default App;
