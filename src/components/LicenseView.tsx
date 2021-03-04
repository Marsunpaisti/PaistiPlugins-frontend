import React, { useContext, useEffect, useState } from 'react'
import css from './LicenseView.module.scss'
import classNames from 'classnames/bind'
import { database, storage } from '../utils/firebase'
import { MainContext } from '../contexts/MainContext'
import { LoadingSpinner } from './LoadingSpinner'
import axios from 'axios'
import productJson from '../products.json'
const classes = classNames.bind(css)

interface LicenseDataAndDownload {
	licenseType: string;
	expiration: number;
	instances: number;
	downloadUrl?: string;
}

export const LicenseView: React.FC = () => {
	const { user } = useContext(MainContext);
	const [licenses, setLicenses] = useState<LicenseDataAndDownload[] | undefined>(undefined);


	const downloadFile = async (downloadUrl: string) => {
		const authToken = user?.getIdToken;
		const res = await axios.get(downloadUrl, {
			headers: {
				'Authorization': `Bearer ${authToken}`
			}
		});
		return false;
	}

	useEffect(() => {
		let unsubscribe: null | (() => void) = null;
		const subscribeToLicenses = async () => {
			if (!user) {
				setLicenses(undefined);
				return;
			}

			unsubscribe = database.collection('licenses').doc(user.uid).collection('userLicenses').onSnapshot(async (res) => {
				//const converted: LicenseDataAndDownload[] = []
				const converted = res.docs.map(l => l.data() as LicenseDataAndDownload).map(async l => {
					const download = productJson.find(p => p.licenseType === l.licenseType)?.download;
					if (download) {
						let downloadUrl = undefined;
						try {
							downloadUrl = await storage.refFromURL(download).getDownloadURL()
						} catch (e){
							console.log(e);
						}
						if (downloadUrl) {
							return {
								...l,
								downloadUrl
							}
						}
					}
					return l
				});
				const awaited = await Promise.all(converted);
				setLicenses(awaited);
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


	return (
	<>
		<span className={css.title}>Your licenses</span>
		<div  className={css.container}>
		{licenses.length === 0 && <p>No licenses</p>}
		{licenses.map(data => {
			const expired = Date.now() >= data.expiration;
			return (
				<div className={classes(css.license, {expired: expired})} key={data.licenseType}>
					<p>{data.licenseType}</p>	
					{expired && <p className={css.red}>Expired: {new Date(data.expiration).toDateString()}</p>}
					{!expired && <p className={css.green}>Expires: {new Date(data.expiration).toDateString()}</p>}
					<p>Instances: {data.instances}</p>
					{!expired && data.downloadUrl && <a className="link" href={data.downloadUrl}>Download</a>}
				</div>
			)
		})}
	</div>
	</>
	)
}
