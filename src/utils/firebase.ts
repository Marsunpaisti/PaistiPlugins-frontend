import firebase from 'firebase'

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
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const messaging = firebase.messaging()
export const functions = firebase.app().functions('europe-west1');
