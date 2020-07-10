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
import ReadStory1 from './temp/Story'; 



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
       <Route exact path="/ReadStory"  render={(props) => <ReadStory {...props}/>}  />
       <Route exact path="/ReadStory1"component={ReadStory1}/>

      <Route exact path="/Create" component={Create}/>
      <Route exact path="/WriteStory"  render={(props) => <WriteTheStory {...props}/>}  />
      {/* <Route exact path="/WritePoem" ><WriteStory title="Poem"/></Route>
      <Route exact path="/WriteBlog" ><WriteStory title="Blog"/></Route>
      <Route exact path="/WriteArticle" ><WriteStory title="Article"/></Route>
      <Route exact path="/WriteFanFiction" ><WriteStory title="fanFiction"/></Route> */}
      <Route exact path = "/Profile" ><Profile /> </Route>
      <Route exact path="/test" component={Test}
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

  ,
  document.getElementById('root')
);


