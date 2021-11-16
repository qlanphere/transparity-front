import './App.css';
import Sidebar from './components/Sidebar';
import { Login, Register, Home, Feedback, CharityPage, DonationsPage, CharityPost, Tickets, TicketId, About } from './pages'
import DonatePage from './pages/DonatePage';
import ThankPage from './pages/ThankPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as CustomRoutes from "./routing";
import BurgerMenu from './components/BurgerMenu/BurgerMenu'
import DisplayRating from './components/DisplayRating/index.js';
import Footer from './components/Footer/index'
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
          <Route exact path="/timeline">
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
          <Route exact path='/home'>
            <About />
            </Route>
          <CustomRoutes.PrivateUserRoute exact path="/feedbackForm">
            <Feedback />
          </CustomRoutes.PrivateUserRoute>
          <Route exact path="/charities/:name">
            <CharityPage />
          </Route>
          <CustomRoutes.PrivateUserRoute exact path="/donate">
            <DonatePage />
          </CustomRoutes.PrivateUserRoute>
          <CustomRoutes.PrivateUserRoute exact path="/thankyou">
            <ThankPage />
          </CustomRoutes.PrivateUserRoute>
          <CustomRoutes.LoggedOutRoute exact path="/donations">
            <DonationsPage />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.PrivateCharityRoute exact path="/charitypost">
            <CharityPost />
          </CustomRoutes.PrivateCharityRoute>
          <CustomRoutes.LoggedOutRoute exact path="/tickets">
            <Tickets />
          </CustomRoutes.LoggedOutRoute>
          <CustomRoutes.LoggedOutRoute exact path="/tickets/:id">
            <TicketId />
          </CustomRoutes.LoggedOutRoute>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
