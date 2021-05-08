import React, { useContext } from 'react';
import { UserContext } from '@src/UserContext.js';
import { useHistory } from "react-router-dom";
import './navbar.css';
import { AiFillHome } from 'react-icons/ai';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const NavBar = () => {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	const items_navbar = [
		{
			title: 'Home',
			itemId: '/',
			elemBefore: () => <AiFillHome />,
		},
		{
			title: 'Accedi',
			itemId: '/login',
			elemBefore: null,
		},
		{
			title: 'Registrati',
			itemId: '/signin',
			elemBefore: null,
		}
	];

	switch(user.categoria){
		case "Ministero":
			items_navbar.push({
				title: 'Infrastrutture',
				itemId: '/infrastrutture',
				elemBefore: null,
				subNav: [
					{
						title: 'Visualizza Mappa',
						itemId: '/infrastrutture/mappa',
						elemBefore: null
					}
				]
			  },
			  {
				title: 'Bandi di Manutenzione',
				itemId: '/bandi',
				elemBefore: null,
			  });
			  break;
		case "Societa Manutenzione":
			items_navbar.push({
				title: 'Bandi di Manutenzione',
				itemId: '/bandi',
				elemBefore: null,
			  });
			break;
		case "Societa Autostrada":
			items_navbar.push({
				title: 'Infrastrutture',
				itemId: '/infrastrutture',
				elemBefore: null,
				subNav: [
					{
						title: 'Visualizza Mappa',
						itemId: '/infrastrutture/mappa',
						elemBefore: null
					}
				]
			  },
			  {
				title: 'Bandi di Manutenzione',
				itemId: '/bandi',
				elemBefore: null,
			  });
	}

	return (
			<div className="my-navbar">
				<Navigation
					activeItemId="/"
					onSelect={({ itemId }) => {
						history.push(itemId);
					}}
					items={items_navbar}
				/>
			</div>
		);
}

export default NavBar;