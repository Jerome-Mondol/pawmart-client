import { Children, createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { auth } from '../firebase/firebase.init' 
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, []);

    // Email pass signup
    const signUpWithEmailAndPassword = async (email, password, displayName, photoURL) => {
        try { 
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, {
                displayName,
                photoURL
            })
            toast.success("Account Registered Successfully");
            return result
        }
        catch (err) {
            toast.error(`Error: ${err.message}`)
        }
    }

    // Login in
    const logInWithEmailAndPassword = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Successfully Logged in")
            return result;
        }
        catch (err) {
            toast.error(`Error: ${err.message}`)
            console.log(err)
        }
    }

    //  Sign in with google 
    const signInWithGoogle = async () => { 
        try {
            const result = await signInWithPopup(auth, provider);
            toast.success("Successfully logged in with Google")
            return result;
        }
        catch (err) {
            toast.error(`Error: ${err.message}`)
        }
    }
    
    // Signout
    const emailPasswordSignOut = async () => {
        try {
            const result = await signOut(auth);
            console.log(result);
            toast.success("Successfully signed out");
        }
        catch(err) {
            toast.error(`Error: ${err}`)
        }
    }
    
    const value = {user, signUpWithEmailAndPassword, emailPasswordSignOut, logInWithEmailAndPassword, signInWithGoogle}


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

