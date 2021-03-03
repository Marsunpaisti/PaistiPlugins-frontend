import React, { useContext, useEffect, useState } from 'react'
import css from './LicenseView.module.scss'
import classNames from 'classnames/bind'
import { database } from '../utils/firebase'
import { MainContext } from '../contexts/MainContext'
import { LoadingSpinner } from './LoadingSpinner'

const classes = classNames.bind(css)

interface LicenseData {
	licenseType: string;
	expiration: number;
	instances: number;
}
export const LicenseView: React.FC = () => {
	const { user } = useContext(MainContext);
	const [licenses, setLicenses] = useState<LicenseData[] | undefined>(undefined);


	useEffect(() => {
		let unsubscribe: null | (() => void) = null;
		const subscribeToLicenses = async () => {
			if (!user) {
				setLicenses(undefined);
				return;
			}
			unsubscribe = database.collection('licenses').doc(user.uid).collection('userLicenses').onSnapshot((res) => {
				const converted: LicenseData[] = []
				res.docs.forEach(l => converted.push(l.data() as LicenseData));
				setLicenses(converted);
			})
			//const res = await database.collection('licenses').doc(user.uid).collection('userLicenses').get();
		}
		subscribeToLicenses();

		return () => {
			if (unsubscribe) unsubscribe();
		}
	}, [user])
	
	if (!user) return <div>Log in to view your licenses</div>
	if (licenses === undefined) {
		return <div><LoadingSpinner/></div>
	}

	return (<>

		<span className={css.title}>Your licenses</span>
	<div  className={css.container}>
		{licenses.length === 0 && <p>No licenses</p>}
		{licenses.map(data => {
			const expired = Date.now() >= data.expiration;
			return (
				<div className={classes(css.license, {expired: expired})}>
					<p>{data.licenseType}</p>	
					{expired && <p className={css.red}>Expired: {new Date(data.expiration).toDateString()}</p>}
					{!expired && <p className={css.green}>Expires: {new Date(data.expiration).toDateString()}</p>}
					<p>Instances: {data.instances}</p>	
				</div>
			)
		})}
	</div>
	</>
	)
}
