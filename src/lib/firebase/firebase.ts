// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';

import {
	firebase_API_Key,
	firebase_appId,
	firebase_authDomain,
	firebase_databaseURL,
	firebase_measurementId,
	firebase_messagingSenderId,
	firebase_projectId,
	firebase_storageBucket
} from '$lib/enviroment/env.enviroment';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: firebase_API_Key,
	authDomain: firebase_authDomain,
	databaseURL: firebase_databaseURL,
	projectId: firebase_projectId,
	storageBucket: firebase_storageBucket,
	messagingSenderId: firebase_messagingSenderId,
	appId: firebase_appId,
	measurementId: firebase_measurementId
};

let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const database = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp, 'europe-west3');
