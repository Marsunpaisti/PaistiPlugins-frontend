import React from 'react';
import css from './Layout.module.scss';

export const Layout: React.FC = ({ children }) => {
	return <div className={css.container}>{children}</div>;
};
