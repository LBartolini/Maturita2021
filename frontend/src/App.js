import LoginScreen from '@src/login/login.js';
import SigninScreen from '@src/signin/signin.js';
import NavBar from '@src/navbar/navbar.js';
import HomeScreen from '@src/home/home.js';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import GlobalVar from '@src/GlobalVar.js';
import './global.css';

function App() {
  return (
    <Router>
		<NavBar />
		<Switch className="router">
			<Route path="/login" component={LoginScreen} />
			<Route path="/signin" component={SigninScreen} />
			<Route path="/" exact component={HomeScreen} />
		</Switch>
      <LoginScreen />
    </Router>
  );
}

export default App;
