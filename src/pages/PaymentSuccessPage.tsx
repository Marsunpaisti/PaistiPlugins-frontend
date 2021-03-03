import React from 'react';
import { LicenseView } from '../components/LicenseView';
import css from './PaymentSuccessPage.module.scss'

export const PaymentSuccessPage = () => {
	return <><p className={css.title}>Payment successful!</p> <LicenseView/></>
};
