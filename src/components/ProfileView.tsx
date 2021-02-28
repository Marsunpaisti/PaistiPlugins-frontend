import React, { useContext, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MainContext } from '../contexts/MainContext';
import { auth } from '../utils/firebase';
import { Alert } from './Alert';
import { ApiKeyGenerator } from './ApiKeyGenerator';
import { LoadingSpinner } from './LoadingSpinner';
import css from './ProfileView.module.scss';

export const ProfileView: React.FC = () => {
    const { user, authenticated, setUser } = useContext(MainContext);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const interval = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        return () => {
            if (interval.current) clearInterval(interval.current);
        }
    }, [])

    useEffect(() => {
        if (interval.current && user?.emailVerified) clearInterval(interval.current);
    }, [user?.emailVerified])

    if (!authenticated){
        return <Redirect to={'/login'} />
    }

    const emailVerification = async () => {
        setError('');
        setInfo('');
        try {
            setLoading(true);
            await auth.currentUser?.sendEmailVerification();
            
            if (interval.current) clearInterval(interval.current);
            interval.current = setInterval(async () => {
                await auth.currentUser?.reload();
                if (auth.currentUser?.emailVerified) setUser({...auth.currentUser});
            }, 2000);
            setInfo('Verification link sent!');
        } catch (e){
			setError(e.message)
			console.error('Error sending verification link: ' + e);
        }
        setLoading(false);
    }

	return (
    <div className={css.container}>
        <span className={css.title}>PROFILE</span>
        <span className={css.entry}>
            {user?.displayName}
        </span>
        <span className={css.entry}>
            {user?.email}{user?.email && (user?.emailVerified ? ' (Verified)' : ' (Not verified)')}
        </span>
        <span className={css.entry}>
            {user?.uid}
        </span>

        {!isLoading && (
        <div className={css.buttonGroup}>
            { error.length > 0 && (
                <div className={css.alert}>
                    <Alert type="error" message={error} onClick={() => setError('')}/>
                </div>
            )}
            { info.length > 0 && (
                <div className={css.alert}>
                    <Alert type="info" message={info} onClick={() => setInfo('')}/>
                </div>
            )}
            <ApiKeyGenerator/>
            {!user?.emailVerified && <button onClick={() => emailVerification()}>Send email verification link</button>}
            <button onClick={() => auth.signOut()}>Sign out</button>
        </div>
        )}
        {isLoading && 
        <div className={css.spinnerContainer}>
            <LoadingSpinner/>
        </div>
        }
    </div>
    )
};
