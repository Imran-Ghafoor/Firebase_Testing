// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getRemoteConfig } from "firebase/remote-config";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase config (keep yours filled)
const firebaseConfig = {
    apiKey: "AIzaSyDwE-NzUobrtTEy96IhiIMeNnN9hcjavxQ",
    authDomain: "fir-analytics-54f7b.firebaseapp.com",
    projectId: "fir-analytics-54f7b",
    storageBucket: "fir-analytics-54f7b.firebasestorage.app",
    messagingSenderId: "710050790992",
    appId: "1:710050790992:web:1358fd5b5196e2d4d11b55"
};


const app = initializeApp(firebaseConfig);

// ✅ Set debug flag BEFORE analytics is initialized
if (typeof window !== "undefined") {
    window["firebase_analytics_debug_mode"] = true;
}

let analytics = null;
isSupported().then((yes) => {
    if (yes) {
        analytics = getAnalytics(app);
    }
});

// 🔁 Remote Config Setup
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings = {
    minimumFetchIntervalMillis: 0,
};
remoteConfig.defaultConfig = {
    button_text: "Default Text",
    banner_image: "default.jpg",
};

export { remoteConfig, analytics };
