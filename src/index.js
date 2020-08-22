import React, { useState } from 'react';
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
import StorySeries from './Write/Story/StorySeries' ;
import Myshelf from './MyShelf/Myshelf';
import ScribblePlayer from './AudioUI/ScribblePlayer';
import WriteQuote from './Write/Quote/Main';
import { Recorder } from './AudioUI/Recorder';
import ReadQuote from './Read/Quote/Main';


function App(){
  const [play, setPlay] = useState(false);
  const [data,setData] = useState()

  function setPlayAudio(data){
    if(play){
      setPlay(false);
    }
    setTimeout(()=>{setPlay(true);},200)
    setData(data);
  }
  
  return <div>
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
      <Route exact path="/Create" render={(props) => <Create setPlayAudio={setPlayAudio} {...props} />  } ></Route>
      <Route  exact path= "/WriteQuote"  render={(props) => <WriteQuote {...props} />  } ></Route>
      <Route exact path="/WriteStory"  render={(props) => <WriteTheStory {...props}/>}  />
      <Route exact path="/ReadQuote"  render={(props) => <ReadQuote {...props}/> }/>
      <Route exact path="/discover" render={(props) => <Discover setPlayAudio={setPlayAudio} {...props} />  } />
     
      <Route exact path="/test" component={Test}
      />
      <PrivateRoute exact path="/unverif" component={Unverif}
      />
       <PrivateRoute exact path="/my-shelf" component={Myshelf}
      />
      <PrivateRoute exact path="/recorder" component={Recorder}
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
  {play===true?<ScribblePlayer play={setPlay} data={data}/>:null}
  </div>
}



ReactDOM.render(
  <div>
  <App />
  </div>

  ,
  document.getElementById('root')
);


