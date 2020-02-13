import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
	apiKey: "AIzaSyC3q8e5VrCbkDN88ZLDDST5jpNs_lNX_fI",
	authDomain: "m-city-e2c48.firebaseapp.com",
	databaseURL: "https://m-city-e2c48.firebaseio.com",
	projectId: "m-city-e2c48",
	storageBucket: "m-city-e2c48.appspot.com",
	messagingSenderId: "327097234941",
	appId: "1:327097234941:web:a2c33e2a8b7cdba5ab9594"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database()
const firebaseMatches = firebaseDB.ref('matches')

export {
	firebase,
	firebaseMatches
}