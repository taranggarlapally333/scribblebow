import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/home';
import Login from './login/Login';
import Signup from './login/Signup';
import {Test} from './login/Test';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthProvider } from './Auth';
import ReadStory from './Read/Story/Story' ;  
import Profile from './Read/Profile/Profile';
import Pref0 from './login/Pref0';
import Pref1 from './login/Pref1';
import Log0 from './login/Log0';
import WriteTheStory from './Write/Story/Main' ;
import Create from './Write/create' ; 
import PrivateRoute from './PrivateRoute';
import Unverif from './login/Unverif';
import Discover from './discover/Discover';
import Reports from './Write/Report/Reports';
import EditProfile from './Write/Profile/EditProfile';
import StorySeries from './Write/Story/StorySeries' ;
import Myshelf from './MyShelf/Myshelf';
import ScribblePlayer from './AudioUI/ScribblePlayer';
import WriteQuote from './Write/Quote/Main';
import ReadQuote from './Read/Quote/Main';



ReactDOM.render(
  <div>
 
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
      <Route exact path="/Report" component={Reports}
      />
       
       <PrivateRoute exact path="/ReadStory" component={ReadStory}  />
       <Route exact path="/Profile"  render={(props) => <Profile {...props  }/>}  />
       <Route exact path="/StorySeries"  render={(props) => <StorySeries  {...props} />}  />
      <PrivateRoute exact path="/Create" component={Create}/>
      <Route  exact path= "/WriteQuote"  render={(props) => <WriteQuote {...props} />  } ></Route>
      <Route exact path="/WriteStory"  render={(props) => <WriteTheStory {...props}/>}  />
      <Route exact path="/ReadQuote"  render={(props) => <ReadQuote {...props}/> }/>
      <PrivateRoute exact path="/discover" component={Discover}/>
     
      <Route exact path="/test" component={Test}
      />
      <PrivateRoute exact path="/unverif" component={Unverif}
      />
       <PrivateRoute exact path="/my-shelf" component={Myshelf}
      />
      <Route exact path="/Pref0" component={Pref0}
      />
      <Route exact path="/Pref1" component={Pref1}
      />
      <Route exact path="/Log0" component={Log0}
      />
      <Route exact path="/testnow" component={Test}
      />

    </div>
  </Router>
  </AuthProvider>
 

  </div>

  ,
  document.getElementById('root')
);


