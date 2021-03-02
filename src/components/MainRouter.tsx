import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { DiscordCallbackPage } from '../pages/DiscordCallbackPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { PaymentSuccessPage } from '../pages/PaymentSuccessPage';
import { ProfilePage } from '../pages/ProfilePage';
import { StorePage } from '../pages/StorePage';
import { Layout } from './Layout';
import { Navbar } from './Navbar';

const routes = [
	{
		path: '/',
		component: HomePage,
		exact: true,
	},
	{
		path: '/signin',
		component: LoginPage,
		exact: false,
	},
	{
		path: '/store',
		component: StorePage,
		exact: false,
	},
	{
		path: '/signout',
		component: LogoutPage,
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
	{
		path: '/paymentsuccess',
		component: PaymentSuccessPage,
		exact: false
	}
];

export const MainRouter = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Layout>
				{routes.map((r) => (
					<Route exact={r.exact} path={r.path} component={r.component} key={r.path} />
				))}
			</Layout>
		</BrowserRouter>
	);
};
