import React from 'react'
import css from './Alert.module.scss'
import classNames from 'classnames/bind'

const classes = classNames.bind(css)

type AlertProps = {
	message: string
	type: 'error' | 'info'
	onClick?: () => void
}

export const Alert: React.FC<AlertProps> = ({
	message,
	type,
	onClick,
}) => {
	return <div className={classes(css.container, css.fade, css[type], {pressable: onClick})} onClick={() => {
		if (onClick) onClick();
	}}>{message}</div>
}
