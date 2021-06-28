import './App.css';
import Home from './Components/Home';
import Profile from './Components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AppContext } from './Context/AppContext';
import { useState } from 'react';

function App() {

  const [userName, setUserName] = useState("");
  const [tweetArray, setTweetArray] = useState([]);
 



  return (
    <Router>
      <div>
        <div className="navbar">
          <Link className="navbar-item" to="/">Home</Link>
          <Link className="navbar-item" to="/profile">Profile</Link>
        </div>


        <AppContext.Provider value={{
          userName: userName,
          setUserName: setUserName,
          tweetArray: tweetArray,
          setTweetArray: setTweetArray,
        }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </AppContext.Provider>
        
      </div>
    </Router>

  );

}

export default App;
