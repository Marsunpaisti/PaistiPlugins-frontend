import React, {useEffect} from 'react';
import { LicenseView } from '../components/LicenseView';
import { auth } from '../utils/firebase';
import css from './PaymentSuccessPage.module.scss'

export const PaymentSuccessPage = () => {
	
	useEffect(() => {
		// Refresh token and new custom claims
		auth.currentUser?.getIdToken(true);
	}, [])
 
	
	return <><p className={css.title}>Payment successful!</p> <LicenseView/></>
};
