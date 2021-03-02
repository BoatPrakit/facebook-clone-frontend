import AuthPage from './components/Authentication/AuthPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Register from './components/Authentication/Register'
import checkAuth from './components/HOCs/checkAuth'
import checkLogin from './components/HOCs/checkLogin'
import Home from './components/home/Home'
function App() {
  return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={checkLogin(AuthPage)} />
          </Switch>
        </Router>
      </div> 
  );
}

export default App;
