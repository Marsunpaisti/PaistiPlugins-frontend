import React from 'react';
import css from './LoadingSpinner.module.scss';
import classNames from 'classnames/bind'
const classes = classNames.bind(css)

type SpinnerProps =  {
	size?: 'small' | 'normal' | 'large' | 'huge';
}

export const LoadingSpinner: React.FC<SpinnerProps> = ({size = 'normal'}) => {
	return (
		<div className={classes(css.ldsSpinner, css[size])}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
