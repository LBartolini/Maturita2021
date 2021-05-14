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
		}
	];

	if (!user) {
		items_navbar.push({
			title: 'Accedi',
			itemId: '/login',
			elemBefore: null,
		},
			{
				title: 'Registrati',
				itemId: '/signin',
				elemBefore: null,
			});
	} else {
		switch (user.categoria) {
			case "Ministero":
				items_navbar.push({
					title: 'Infrastrutture',
					itemId: '/infrastrutture',
					elemBefore: null,
				},
					{
						title: 'Visualizza Mappa',
						itemId: '/mappa',
						elemBefore: null
					},
					{
						title: 'Appalti di Manutenzione',
						itemId: '/appalti',
						elemBefore: null,
					});
				break;
			case "Societa Manutenzione":
				items_navbar.push({
					title: 'Appalti di Manutenzione',
					itemId: '/appalti',
					elemBefore: null,
				});
				break;
			case "Societa Autostrada":
				items_navbar.push({
					title: 'Infrastrutture',
					itemId: '/infrastrutture',
					elemBefore: null,
				},
					{
						title: 'Visualizza Mappa',
						itemId: '/mappa',
						elemBefore: null
					},
					{
						title: 'Appalti di Manutenzione',
						itemId: '/Appalti',
						elemBefore: null,
					});
				break;
		}
		items_navbar.push({
			title: 'Esci',
			itemId: '/logout',
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