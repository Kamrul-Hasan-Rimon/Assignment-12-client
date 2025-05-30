import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
} from "firebase/auth";
import axios from "axios";
import PropTypes from "prop-types";
import auth from "../firebase/firebase.Config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);
      try {
        if (currentUser?.email) {
          // Sync user data with backend
          const response = await axios.post(`${import.meta.env.VITE_API_TOKEN}/users`, {
            name: currentUser.displayName,
            image: currentUser.photoURL,
            email: currentUser.email,
          });

          if (response.data.success) {
            const tokenResponse = await axios.post(
              `${import.meta.env.VITE_API_TOKEN}/jwt`,
              { email: currentUser.email }
            );

            if (tokenResponse.data.token) {
              localStorage.setItem('token', tokenResponse.data.token);
            }
          }
        } else {
          localStorage.removeItem("token");
          await axios.post(`${import.meta.env.VITE_API_TOKEN}/logout`);
        }
      } catch (error) {
        console.error("Auth state error:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      setAuthLoading(true);
      await signOut(auth);
      localStorage.removeItem("token");
      await axios.post(`${import.meta.env.VITE_API_TOKEN}/logout`);
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Failed to logout. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Registration Error:", error.message);
      throw new Error(
        error.code === "auth/email-already-in-use"
          ? "Email already in use"
          : "Registration failed. Please try again."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw new Error(
        error.code === "auth/wrong-password" || error.code === "auth/user-not-found"
          ? "Invalid email or password"
          : "Login failed. Please try again."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const googleSignIn = async () => {
    setAuthLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw new Error(
        error.code === "auth/popup-closed-by-user"
          ? "Sign in was cancelled"
          : "Google sign in failed. Please try again."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    setAuthLoading(true);
    try {
      const currentUser = auth.currentUser;

      // Update Firebase Authentication profile
      if (updates.name || updates.image) {
        await firebaseUpdateProfile(currentUser, {
          displayName: updates.name || currentUser.displayName,
          photoURL: updates.image || currentUser.photoURL,
        });
      }

      // Update email if provided
      if (updates.email && updates.email !== currentUser.email) {
        await firebaseUpdateEmail(currentUser, updates.email);
      }

      // Sync updated profile with backend
      const response = await axios.put(`${import.meta.env.VITE_API_TOKEN}/users`, {
        name: updates.name || currentUser.displayName,
        image: updates.image || currentUser.photoURL,
        email: updates.email || currentUser.email,
      });

      // Update local user state
      setUser((prevUser) => ({
        ...prevUser,
        displayName: updates.name || prevUser.displayName,
        photoURL: updates.image || prevUser.photoURL,
        email: updates.email || prevUser.email,
      }));

      return response.data; 
    } catch (error) {
      console.error("Profile update error:", error.message);
      throw new Error(
        error.code === "auth/requires-recent-login"
          ? "Please log out and log back in to update sensitive information."
          : "Failed to update profile. Please try again."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        register,
        login,
        logout,
        googleSignIn,
        updateProfile,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};