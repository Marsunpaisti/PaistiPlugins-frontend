import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import css from './Navbar.module.scss';
import { ReactComponent as KaakkiLogo } from './../assets/kaakki.svg';
import { MainContext } from '../contexts/MainContext';
import BGImageNav from '../assets/bgnav.jpg'

export const Navbar: React.FC = () => {
	const { authenticated } = useContext(MainContext);
	return (
		<nav className={css.navbar}>
			<img className={css.bgimg} src={BGImageNav} alt="background"/>
			<Link to={'/'} className={css.logotitlecontainer}>
				<KaakkiLogo className={css.logo} />
				<span className={css.title}>PAISTI PLUGINS</span>
			</Link>
			<Link to={'/'} className={css.navButton}>
				Home
			</Link>
			<Link to={'/store'} className={css.navButton}>
				Store
			</Link>
			{authenticated && (
				<Link to={'/profile'} className={css.navButton}>
					Profile
				</Link>
			)}
			{authenticated && (
				<Link to={'/logout'} className={css.navButton}>
					Logout
				</Link>
			)}
			{!authenticated && (
				<Link to={'/signin'} className={css.navButton}>
					Login
				</Link>
			)}
		</nav>
	);
};
