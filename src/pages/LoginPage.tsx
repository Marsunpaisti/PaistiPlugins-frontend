import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { DiscordLoginBox } from '../components/DiscordLoginBox';
import { MainContext } from '../contexts/MainContext';

export const LoginPage = () => {
	const { authenticated } = useContext(MainContext)
    const fullHash = useLocation().hash;
	const params = new URLSearchParams(fullHash.slice(1));
	let redirectUrl = params.get('redirect');

	if (authenticated) {
		if (redirectUrl){
			return <Redirect to={redirectUrl} />;
		} else {
			return <Redirect to={'/profile'} />;
		}
	}

	return (
		<>
			<DiscordLoginBox />
		</>
	);
};
