import React, { useState } from 'react'
import css from './DiscordLoginBox.module.scss'
import { ReactComponent as DiscordLogo } from './../assets/discord-icon-text.svg'
import { LoadingSpinner } from './LoadingSpinner'
import classNames from 'classnames/bind'
import { signInWithDiscord } from '../utils/oauthpopup'

const classes = classNames.bind(css)

export const DiscordLoginBox: React.FC = () => {
	const [_error, setError] = useState('');
	const [isLoading, setLoading] = useState(false);
	const discordLogin = async () => {
        setError('');
		try {
			setLoading(true);
			await signInWithDiscord();
		} catch (e) {
			setError(e.message)
			console.error('Error in discord login: ' + e)
		}
		setLoading(false);
	}

	if (isLoading){
		return (
		<div className={classes(css.container, css.spinner, css.login)} onClick={() => discordLogin()}>
			<span className={css.spinnerTitle}>Waiting for Discord login...</span>
			< LoadingSpinner size="normal" />
		</div>
		)
	}

	return (
		<div className={css.container} onClick={() => discordLogin()}>
			<span className={css.loginTitle}>Sign in with</span>
			<DiscordLogo />
		</div>
	)
}
