
import './App.css';
import Sidebar from './components/Sidebar';
import { Login, Register, Home} from './pages'
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Route exact path = "/home">
              <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path = "/register">
            <Register />
          </Route>
          <Route exact path = "/charities/:name">

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
