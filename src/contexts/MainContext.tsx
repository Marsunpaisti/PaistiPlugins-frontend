import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

type ContextProps = {
	user: firebase.User | null;
	authenticated: boolean;
	setUser: any;
};

export const MainContext = React.createContext<Partial<ContextProps>>({});

export const MainContextProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState(null as firebase.User | null);

	useEffect(() => {
		const unSub = firebase.auth().onAuthStateChanged((user: any) => {
			setUser(user);
		});

		return () => {
			unSub();
		};
	}, []);

	return (
		<MainContext.Provider
			value={{
				user,
				authenticated: user !== null,
				setUser,
			}}
		>
			{children}
		</MainContext.Provider>
	);
};
