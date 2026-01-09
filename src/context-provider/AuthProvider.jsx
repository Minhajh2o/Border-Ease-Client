import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to convert Firebase error codes to user-friendly messages
const getFirebaseErrorMessage = (errorCode) => {
    const errorMessages = {
        'auth/invalid-credential': 'Invalid email or password. Please check your credentials.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
        'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.',
    };
    return errorMessages[errorCode] || 'An error occurred. Please try again.';
};

// Helper function to save user to database
const saveUserToDatabase = async (user) => {
    const userData = {
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    } catch (error) {
        console.error('Error saving user to database:', error);
    }
};

// Helper function to update user's last login
const updateUserLastLogin = async (email) => {
    try {
        const response = await fetch(`${API_URL}/users/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lastLoginAt: new Date().toISOString() })
        });
        return response.json();
    } catch (error) {
        console.error('Error updating user last login:', error);
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    // Create user with email and password
    const createUser = async (email, password, name, photoURL) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // Update profile with name and photo
            await updateProfile(result.user, {
                displayName: name,
                photoURL: photoURL
            });
            // Save user to database (without password)
            await saveUserToDatabase({
                email: result.user.email,
                displayName: name,
                photoURL: photoURL
            });
            return result;
        } catch (error) {
            const message = getFirebaseErrorMessage(error.code);
            throw new Error(message);
        }
    };

    // Sign in with email and password
    const signIn = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            // Update last login time (don't await - do in background)
            updateUserLastLogin(email);
            return result;
        } catch (error) {
            const message = getFirebaseErrorMessage(error.code);
            throw new Error(message);
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Save or update user in database
            await saveUserToDatabase(result.user);
            return result;
        } catch (error) {
            const message = getFirebaseErrorMessage(error.code);
            throw new Error(message);
        }
    };

    // Sign out
    const logOut = () => {
        return signOut(auth);
    };

    // Update user profile
    const updateUserProfile = async (name, photoURL) => {
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
        // Also update in database
        if (auth.currentUser?.email) {
            await fetch(`${API_URL}/users/${auth.currentUser.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ displayName: name, photoURL: photoURL })
            });
        }
    };

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
