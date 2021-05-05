import React, {useState} from 'react';
import {
	useHistory
  } from "react-router-dom";
import './navbar.css';
import { AiFillHome } from 'react-icons/ai';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const NavBar = () => {
	const history = useHistory();

	return (
		<div className="navbar">
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
                title: 'Management',
                itemId: '/management',
                elemBefore: null,
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/management/projects',
                  },
                  {
                    title: 'Members',
                    itemId: '/management/members',
                  },
                ],
              },
            ]}
          />
		</div>
	);
}

export default NavBar;