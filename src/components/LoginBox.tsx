import React, { useContext, useState } from 'react'
import css from './LoginBox.module.scss'
import { ReactComponent as GoogleLogo } from './../assets/google-icon.svg'
import { ReactComponent as DiscordLogo } from './../assets/discord-icon.svg'
import { auth, googleAuthProvider } from '../utils/firebase'
import { MainContext } from '../contexts/MainContext'
import { Alert } from './Alert'
import { LoadingSpinner } from './LoadingSpinner'
import classNames from 'classnames/bind'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { signInWithDiscord } from '../utils/oauthpopup'

const classes = classNames.bind(css)

export const LoginBox = () => {
	const { authenticated } = useContext(MainContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('');
	const [isLoading, setLoading] = useState(false);

	const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}

	const emailLogin = async () => {
        setError('');
		try {
			setLoading(true);
			await auth.signInWithEmailAndPassword(email, password)
		} catch (e) {
			setError(e.message)
			console.error('Error in email+pass login: ' + e)
		}
		setLoading(false);
	}

	const googleLogin = async () => {
        setError('');
		try {
			setLoading(true);
			await auth.signInWithPopup(googleAuthProvider)
		} catch (e) {
			setError(e.message)
			console.error('Error in google login: ' + e)
		}
		setLoading(false);
	}

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


	if (authenticated) {
		return <Redirect to={'/profile'} />;
	}

	if (isLoading){
		return (
		<div className={classes(css.container, css.spinner, css.login)}>
			< LoadingSpinner size="huge" />
		</div>
		)
	}

	return (
		<div className={css.container}>
			<span className={css.loginTitle}>Sign in</span>
			<div className={css.loginform}>
				<input
					type='text'
					id='email'
					placeholder='Email'
					onChange={onEmailChanged}
					value={email}
				/>
				<input
					type='password'
					id='password'
					placeholder='Password'
					onChange={onPasswordChanged}
				/>
				{error.length > 0 && <div className={css.alert}>
					<Alert onClick={() => setError('')} type='error' message={error}/>
				</div>}
				<button onClick={() => emailLogin()}>Login</button>
			</div>
			<p className={css.ortext}>OR</p>
			<div className={css.oauth}>
				<button
					className={css.oauthbutton}
					onClick={() => googleLogin()}
				>
					<GoogleLogo />
					Sign in with Google
				</button>
				<button
					className={css.oauthbutton}
					onClick={() => discordLogin()}
				>
					<DiscordLogo />
					Sign in with Discord
				</button>
			</div>
			<div className={css.register}>
				<Link to={'/signup'}>No account yet? Register here</Link>
			</div>
		</div>
	)
}
