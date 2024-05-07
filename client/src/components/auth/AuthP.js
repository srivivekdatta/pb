import React, { useState, useEffect } from 'react';
import IdleModal from './IdleModal';
import { isAuthenticated } from './auth'; // Import your authentication utility functions

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await isAuthenticated();
            setIsLoggedIn(authenticated);
        };

        checkAuth();
    }, []);

    return (
        <>
            {isLoggedIn && <IdleModal />}
            {children}
        </>
    );
};

export default AuthProvider;