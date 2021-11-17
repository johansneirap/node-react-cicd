import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create a Post</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/createpost" exact component={CreatePost}></Route>
          <Route path="/post/:id" exact component={Post}></Route>
          <Route path="/registration" exact component={Registration}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
