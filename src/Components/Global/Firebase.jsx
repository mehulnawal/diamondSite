import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyDUfQ-2dCuddeuBe4BxkUgmI740edBUelo",
    authDomain: "diamondsite-02102025.firebaseapp.com",
    projectId: "diamondsite-02102025",
    storageBucket: "diamondsite-02102025.firebasestorage.app",
    messagingSenderId: "69215560595",
    appId: "1:69215560595:web:a1e1cf0f927d030f087e66",
    measurementId: "G-Z4Q2Q8KBY1",
    databaseURL: 'https://diamondsite-02102025-default-rtdb.firebaseio.com/'
};

export const Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);