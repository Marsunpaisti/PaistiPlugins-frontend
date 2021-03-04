import firebase from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyClyFblqate_KKrzN-d3lMAP5osQrh5SiA',
	authDomain: 'paistiplugins.firebaseapp.com',
	projectId: 'paistiplugins',
	storageBucket: 'paistiplugins.appspot.com',
	messagingSenderId: '273543073664',
	appId: '1:273543073664:web:dbed2cd5190f2597917b65',
	measurementId: 'G-W3L9NTTD4Q',
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

const devMode = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
export const database = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.app().functions('europe-west1');
export const storage = firebase.storage();
// eslint-disable-next-line no-restricted-globals
/*
if (devMode || location.hostname === 'localhost'){
	database.useEmulator('localhost', 8080);
	auth.useEmulator('http://localhost:9099');
	functions.useEmulator('localhost', 5001);
}
*/