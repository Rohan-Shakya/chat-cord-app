import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthState from './context/AuthState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <h1>React</h1>
      </Router>
    </AuthState>
  );
};

export default App;