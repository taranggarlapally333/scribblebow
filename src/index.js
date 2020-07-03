import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/home';
import Login from './login/Login';
import Signup from './login/Signup';
import {Test} from './login/Test';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import ReadStory from './Read/Story/Story' ;  
import navbar from './components/navbar'; 
import Pref0 from './login/Pref0';
import Pref1 from './login/Pref1';


ReactDOM.render(
  <AuthProvider>
  <Router>
    <div>
      <Route exact path="/" component={Home}
      />
      <Route exact path="/home" component={Home}
      />
      <Route exact path="/login" component={Login}
      />
      <Route exact path="/signup" component={Signup}
      />
      <Route exact path="/Read/Story" component={ReadStory}
      />
      <Route exact path="/Read-Story" component={ReadStory}
      />
      <Route exact path="/test" component={Test}
      />
      <Route exact path="/Pref0" component={Pref0}
      />
      <Route exact path="/Pref1" component={Pref1}
      />

    </div>
  </Router>
  </AuthProvider>

  ,
  document.getElementById('root')
);


