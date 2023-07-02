let process: any;

const ENVIROMENT = process?.env ? process.env : import.meta.env;

// Mapbox Config
//API Key
export const mapbox_API_Key = ENVIROMENT.VITE_MAPBOX_ACCESS_TOKENS;
// End Mapbox Config

//Firebase Config
export const firebase_API_Key = ENVIROMENT.VITE_FIREBASE_API_KEY;
export const firebase_authDomain = ENVIROMENT.VITE_FIREBASE_AUTH_DOMAIN;
export const firebase_databaseURL = ENVIROMENT.VITE_FIREBASE_DATABASE_URL;
export const firebase_projectId = ENVIROMENT.VITE_FIREBASE_PROJECT_ID;
export const firebase_storageBucket = ENVIROMENT.VITE_FIREBASE_STORAGE_BUCKET;
export const firebase_messagingSenderId = ENVIROMENT.VITE_FIREBASE_MESSAGING_SENDER_ID;
export const firebase_appId = ENVIROMENT.VITE_FIREBASE_APP_ID;
export const firebase_measurementId = ENVIROMENT.VITE_FIREBASE_MEASUREMENT_ID;

export const firebase_cloud_messaging_server_key =
	ENVIROMENT.VITE_FIREBASE_CLOUD_MESSAGING_SERVER_KEY;
ENVIROMENT.VITE_FIREBASE_CLOUD_MESSAGING_PUBLIC_KEY;
export const firebase_cloud_messaging_vapid_key =
	ENVIROMENT.VITE_FIREBASE_CLOUD_MESSAGING_SERVER_KEY;
// End Firebase Config
