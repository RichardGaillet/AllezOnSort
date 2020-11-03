import {
    API_KEY,
    API_AUTH_DOMAIN,
    API_DATABASE_URL,
    API_PROJECT_ID,
    API_STORAGE_BUCKET,
    API_MESSAGING_SENDER_ID,
    API_APP_ID,
    API_MEASUREMENT_ID
} from '@env';

const configFirebase = {
    apiKey: API_KEY,
    authDomain: API_AUTH_DOMAIN,
    databaseURL: API_DATABASE_URL,
    projectId: API_PROJECT_ID,
    storageBucket: API_STORAGE_BUCKET,
    messagingSenderId: API_MESSAGING_SENDER_ID,
    appId: API_APP_ID,
    measurementId: API_MEASUREMENT_ID
};

export default configFirebase