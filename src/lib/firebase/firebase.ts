// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';

import {
	firebase_API_Key,
	firebase_appId,
	firebase_authDomain,
	firebase_collection_cards,
	firebase_collection_category,
	firebase_collection_favorites,
	firebase_collection_items,
	firebase_collection_orders,
	firebase_collection_roles,
	firebase_collection_users,
	firebase_databaseURL,
	firebase_measurementId,
	firebase_messagingSenderId,
	firebase_projectId,
	firebase_storageBucket
} from '$lib/enviroment/env.enviroment';
import { getFirestore, collection } from 'firebase/firestore';
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

// Collection Names
export const users_collection = collection(database, firebase_collection_users);
export const cards_collection = collection(database, firebase_collection_cards);
export const items_collection = collection(database, firebase_collection_items);
export const category_collection = collection(database, firebase_collection_category);
export const favorites_collection = collection(database, firebase_collection_favorites);
export const orders_collection = collection(database, firebase_collection_orders);
export const roles_collection = collection(database, firebase_collection_roles);
