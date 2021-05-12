import {useContext} from 'react';
import {UserContext} from '@src/UserContext.js';
import {
	useHistory,
  } from "react-router-dom";

const Logout = () => {
	const history = useHistory();
	const {user, setUser} = useContext(UserContext);

	setUser(null);
	history.push('/');
	return null;
}

export default Logout;