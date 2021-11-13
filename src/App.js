
import './App.css';
import Sidebar from './components/Sidebar';
<<<<<<< HEAD
import { Login, Register, Home, Feedback, CharityPage, DonationsPage, CharityPost} from './pages'
=======
import { Login, Register, Home, Feedback, CharityPage, DonationsPage, Tickets, TicketId} from './pages'
>>>>>>> 42bfef72a1e2c6ed9aab49d06cb990f3cf44c807
import 'bootstrap/dist/css/bootstrap.min.css';
import * as CustomRoutes from "./routing";
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
          <Route exact path = "/">
              <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path = "/register">
            <Register />
          </Route>
          <CustomRoutes.LoggedOutRoute exact path = "/feedbackForm">
            <Feedback />
          </CustomRoutes.LoggedOutRoute> 
          <Route exact path = "/charities/:name">
            <CharityPage />
          </Route>
          <CustomRoutes.LoggedOutRoute exact path = "/donations">
            <DonationsPage />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path = "/charitypost">
            <CharityPost />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path = "/tickets">
            <Tickets />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path = "/tickets/:id">
              <TicketId />
          </CustomRoutes.LoggedOutRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
