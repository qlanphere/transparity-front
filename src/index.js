import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './contexts/auth';
import reportWebVitals from './reportWebVitals';
import { CharityProvider } from './contexts/charityContext';
import { PostProvider } from './contexts/postContext';
import { ThemeProvider } from './contexts/ThemeContext'

ReactDOM.render(
  <Router>
    <ThemeProvider>
      <AuthProvider>
        <CharityProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </CharityProvider>
      </AuthProvider>
    </ThemeProvider>
  </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
