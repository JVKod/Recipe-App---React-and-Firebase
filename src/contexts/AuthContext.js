<<<<<<< HEAD

=======
>>>>>>> 3320db8017e085c590b63fe2a380cd77b1524f0b
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }

<<<<<<< HEAD
    /* useEffect(() => {
=======
    useEffect(() => {
>>>>>>> 3320db8017e085c590b63fe2a380cd77b1524f0b
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false)
            

        })
        return unsubscribe
    }, [])
<<<<<<< HEAD

    */
   
=======
>>>>>>> 3320db8017e085c590b63fe2a380cd77b1524f0b
    const value = {
        currentUser,
        login,
        signup,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}