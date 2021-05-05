import LoginScreen from '@src/login/login.js';
import SigninScreen from '@src/signin/signin.js';
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
		<Switch>
			<Route path="/signin" component={SigninScreen} />
			<Route path="/" exact component={LoginScreen} />
		</Switch>
      <LoginScreen />
    </Router>
  );
}

export default App;
