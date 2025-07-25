// lib/firebase.js
import { initializeApp } from "firebase/app";
import {
    getRemoteConfig,
    fetchAndActivate,
    getValue,
} from "firebase/remote-config";

const firebaseConfig = {
    apiKey: "AIzaSyDwE-NzUobrtTEy96IhiIMeNnN9hcjavxQ",
    authDomain: "fir-analytics-54f7b.firebaseapp.com",
    projectId: "fir-analytics-54f7b",
    storageBucket: "fir-analytics-54f7b.firebasestorage.app",
    messagingSenderId: "710050790992",
    appId: "1:710050790992:web:1358fd5b5196e2d4d11b55"
};


const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
    minimumFetchIntervalMillis: 0, // 1 hour
};

remoteConfig.defaultConfig = {
    button_text: "Default Button",
    banner_url: "/default-banner.jpg",
};

export { remoteConfig, fetchAndActivate, getValue };
