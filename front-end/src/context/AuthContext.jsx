import axios from "axios";
import { createContext, useEffect, useState } from "react";


// Membuat Context
export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, inputs, {
            withCredentials: true,
        })

        setCurrentUser(res.data)
    }

    const logout = async () => {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`)

        console.log(res.data);
        setCurrentUser(null)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])


    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
