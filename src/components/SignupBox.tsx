import React, { useContext, useState } from 'react';
import css from './LoginBox.module.scss';
import { ReactComponent as GoogleLogo } from './../assets/google-icon.svg';
import { auth, googleAuthProvider } from '../utils/firebase';
import { Redirect } from 'react-router';
import { MainContext } from '../contexts/MainContext';
import { Alert } from './Alert';
import { LoadingSpinner } from './LoadingSpinner';
import classNames from 'classnames/bind'
const classes = classNames.bind(css);

export const SignupBox = () => {
	const { authenticated } = useContext(MainContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordAgain, setPasswordAgain] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setLoading] = useState(false);

	const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onPasswordAgainChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordAgain(e.target.value);
	};

	const emailSignup = async () => {
        setError('');
		if (passwordAgain !== password) {
			setError('Passwords must match');
			return;
		}

		try {
			setLoading(true);
			await auth.createUserWithEmailAndPassword(email, password);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setError(e.message)
			console.error('Error in login: ' + e)
		}
		setLoading(false);
	};

	const googleLogin = async () => {
        setError('');
		try {
			setLoading(true);
			await auth.signInWithPopup(googleAuthProvider);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			setError(e.message)
			console.error('Error in login: ' + e)
		}
	};

	if (authenticated) {
		return <Redirect to={'/profile'} />;
	}

	if (isLoading){
		return (
		<div className={classes(css.container, css.spinner, css.signup)}>
			< LoadingSpinner size="huge" />
		</div>
		)
	}

	return (
		<div className={css.container}>
			<span className={css.loginTitle}>Sign up</span>
			<div className={css.loginform}>
				<input type="text" id="email" placeholder="Email" onChange={onEmailChanged} value={email} />
				<input type="password" id="password" placeholder="Password" onChange={onPasswordChanged}/>
				<input type="password" id="passwordagain" placeholder="Password again" onChange={onPasswordAgainChanged} />
				{error.length > 0 && <div className={css.alert}>
					<Alert onClick={() => setError('')} type='error' message={error}/>
				</div>}
				<button onClick={() => emailSignup()}>Sign up</button>
			</div>
			<p className={css.ortext}>OR</p>
			<div className={css.oauth}>
				<button className={css.oauthbutton} onClick={() => googleLogin()}>
					<GoogleLogo />
					Sign up with Google
				</button>
			</div>
		</div>
	);
};
