import './App.css';
import Sidebar from './components/Sidebar';
import { Login, Register, Home, Feedback, CharityPage, DonationsPage, CharityPost, Tickets, TicketId, About } from './pages'
import DonatePage from './pages/DonatePage';
import ThankPage from './pages/ThankPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as CustomRoutes from "./routing";
import BurgerMenu from './components/BurgerMenu/BurgerMenu'
import DisplayRating from './components/DisplayRating/index.js';
import {
  BrowserRouter as Router,
  Link, Route, Switch, useParams
} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BurgerMenu />
      {/* <Sidebar /> */}
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <CustomRoutes.LoggedOutRoute exact path="/feedbackForm">
            <Feedback />
          </CustomRoutes.LoggedOutRoute>
          <Route exact path="/charities/:name">
            <CharityPage />
          </Route>
          <Route exact path="/rating">
            <DisplayRating />
          </Route>
          <CustomRoutes.LoggedOutRoute exact path="/donate">
            <DonatePage />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path="/thankyou">
            <ThankPage />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path="/donations">
            <DonationsPage />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path="/charitypost">
            <CharityPost />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path="/tickets">
            <Tickets />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path="/tickets/:id">
            <TicketId />
          </CustomRoutes.LoggedOutRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
