import { Children, createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { auth } from '../firebase/firebase.init' 
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

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
    
    const value = {user, signUpWithEmailAndPassword}


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

