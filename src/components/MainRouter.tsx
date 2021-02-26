import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { DiscordCallbackPage } from '../pages/DiscordCallbackPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { ProfilePage } from '../pages/ProfilePage';
import { Layout } from './Layout';
import { Navbar } from './Navbar';

const routes = [
	{
		path: '/',
		component: () => <div>Home</div>,
		exact: true,
	},
	{
		path: '/signin',
		component: LoginPage,
		exact: false,
	},
	{
		path: '/login',
		component: () => <Redirect to="/signin" />,
		exact: false,
	},
	{
		path: '/signout',
		component: LogoutPage,
		exact: false,
	},
	{
		path: '/logout',
		component: () => <Redirect to="/signout" />,
		exact: false,
	},
	{
		path: '/profile',
		component: ProfilePage,
		exact: false,
	},
	{
		path: '/discordcallback',
		component: DiscordCallbackPage,
		exact: false,
	},
];

export const MainRouter = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Layout>
				{routes.map((r) => (
					<Route exact={r.exact} path={r.path} component={r.component} />
				))}
			</Layout>
		</BrowserRouter>
	);
};
