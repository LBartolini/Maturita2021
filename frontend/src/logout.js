import { useContext } from 'react';
import { UserContext } from '@src/UserContext.js';
import {
	useHistory,
} from "react-router-dom";
import GlobalVar from "@src/GlobalVar.js";


const Logout = () => {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	setUser(null);
	GlobalVar.token = "";
	history.push('/');
	return null;
}

export default Logout;