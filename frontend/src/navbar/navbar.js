import React, {useState} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './navbar.css';
import { AiFillHome } from 'react-icons/ai';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import GlobalVar from '@src/GlobalVar.js';

const NavBar = () => {
	const history = useHistory();

	return (
		<div className="my-navbar">
			<Navigation
            activeItemId="/"
            onSelect={({itemId}) => {
              history.push(itemId);
            }}
            items={[
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
              },
              {
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
              },
            ]}
          />
		</div>
	);
}

export default NavBar;