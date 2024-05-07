import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("token"))
        setUser(storedUser)
    }, [])

    const getUser = () => {
        return JSON.parse(localStorage.getItem("token"))
    }

    const userIsAuthenticated = () => {
        return localStorage.getItem("token") !== null
    }

    const userLogin = user => {
        localStorage.setItem("token", JSON.stringify(user))
        setUser(user)
    }

    const userLogout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    const contextValue = {
        user,
        getUser,
        userIsAuthenticated,
        userLogin,
        userLogout,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export function useAuth() {
    return useContext(AuthContext)
}

export { AuthProvider }