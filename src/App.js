import AuthPage from './components/Authentication/AuthPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './components/Authentication/Register'
import Home from './components/home/Home'
import React, { useState } from 'react'
const GlobalContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
        <Router>
            <Switch>
          <GlobalContext.Provider value={{ user,setUser }}>
              <Route path="/" exact ><Home /></Route>
              <Route path="/register" component={Register} />
              <Route path="/login" component={AuthPage} />
          </GlobalContext.Provider>    
            </Switch>
        </Router>
  );
}
export { GlobalContext }
export default App;
