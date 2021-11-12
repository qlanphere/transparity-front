
import './App.css';
import Sidebar from './components/Sidebar';
import { Login, Register} from './pages'
import {
  BrowserRouter as Router,
  Link, Route, Switch, useParams
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Sidebar/>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path = "/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
