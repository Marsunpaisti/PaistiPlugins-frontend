import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import css from './Navbar.module.scss';
import KaakkiLogo from './../assets/logo192.png';
import { MainContext } from '../contexts/MainContext';

export const Navbar: React.FC = () => {
	const { authenticated } = useContext(MainContext);
	return (
		<nav className={css.wrapper}>
			<div className={css.navbar}>
				<Link to={'/'} className={css.logotitlecontainer}>
					<img src={KaakkiLogo} className={css.logo} />
					<span className={css.title}>PAISTI PLUGINS</span>
				</Link>
				<Link to={'/'} className={css.navButton}>
					Home
				</Link>
				<Link to={'/store'} className={css.navButton}>
					Store
				</Link>
				{authenticated && (
					<>
						<Link to={'/profile'} className={css.navButton}>
							Profile
						</Link>
						<Link to={'/licenses'} className={css.navButton}>
							My Licenses
						</Link>
					</>
				)}
				{authenticated && (
					<Link to={'/signout'} className={css.navButton}>
						Logout
					</Link>
				)}
				{!authenticated && (
					<Link to={'/signin'} className={css.navButton}>
						Login
					</Link>
				)}
			</div>
		</nav>
	);
};
