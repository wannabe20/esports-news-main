import { createContext, useEffect, useState } from "react";
import supabase from '../../supabase.js';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const { email, password } = inputs;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            const user = data.user;
            setCurrentUser(user);
        } catch (error) {
            console.error("Login error:", error.message);
            throw error; // Re-throw error to handle it in the component
        }
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setCurrentUser(null);
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    const fetchSession = async () => {
        const { data } = await supabase.auth.getSession();
        setCurrentUser(data.session?.user || null);
    };

    useEffect(() => {
        // Persist user in localStorage
        localStorage.setItem("user", JSON.stringify(currentUser));

        // Subscribe to authentication state changes
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session?.user || null);
        });

        // Fetch current session on load
        fetchSession();

        return () => subscription.unsubscribe(); // Cleanup subscription on unmount
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
