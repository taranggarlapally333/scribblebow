import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/home';
import Login from './login/Login';
import Signup from './login/Signup';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';


ReactDOM.render(
  <AuthProvider>
  <Router>
    <div>
      <Route exact path="/" component={Home}
      />
      <Route exact path="/login" component={Login}
      />
      <Route exact path="/signup" component={Signup}
      />
    </div>
  </Router>
  </AuthProvider>

  ,
  document.getElementById('root')
);


