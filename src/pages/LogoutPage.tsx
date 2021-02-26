import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { MainContext } from '../contexts/MainContext';
import { auth } from '../utils/firebase';

export const LogoutPage = () => {
	const { authenticated } = useContext(MainContext);

	useEffect(() => {
		auth.signOut();
	}, []);

	if (!authenticated) {
		return <Redirect to={'/login'} />;
	}
	return (
		<>
			<p>Logging out</p>
			<LoadingSpinner />
		</>
	);
};
