import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, addDoc, collection } from "firebase/firestore"
import {toast} from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCMP7I4h7dcgsOLyeRU3I5KuB8eaKEhWag",
    authDomain: "netflix-clone-c9f3d.firebaseapp.com",
    projectId: "netflix-clone-c9f3d",
    storageBucket: "netflix-clone-c9f3d.appspot.com",
    messagingSenderId: "226249349546",
    appId: "1:226249349546:web:1497254f7961b807ccf3d3",
    measurementId: "G-H3RZVQT8JB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (e) {
        console.log(e);
        toast.error(e.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log(e);
        toast.error(e.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};