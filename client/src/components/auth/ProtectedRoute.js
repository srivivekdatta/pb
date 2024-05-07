import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useIdleTimer } from 'react-idle-timer';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const idleTimerRef = useRef(null);
    const IDLE_TIMEOUT = 60000;
    const ALERT_TIMEOUT = IDLE_TIMEOUT / 2;
    const [showAlert, setShowAlert] = useState(false);

    const onActive = () => {
        // User is active again
        setShowAlert(false);
    };

    const onAction = () => {
        // User performed an action (e.g., moved the mouse, pressed a key)
        setShowAlert(false);
    };

    const onIdle = () => {
        // User has been idle for the specified timeout period
        // Perform logout actions here
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const { getRemainingTime, getLastActiveTime, reset } = useIdleTimer({
        timeout: IDLE_TIMEOUT,
        onIdle: onIdle,
        onActive: onActive,
        onAction: onAction,
        debounce: 500,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const remainingTime = getRemainingTime();
            if (remainingTime <= ALERT_TIMEOUT && !showAlert) {
                setShowAlert(true);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [getRemainingTime, showAlert]);

    const handleStayLoggedIn = () => {
        setShowAlert(false);
        reset(); // Reset the idle timer
    };

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    // Token has expired, try to refresh it
                    return refreshToken();
                }

                // Token is still valid
                return true;
            } catch (error) {
                // Invalid token
                return false;
            }
        }

        return false;
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            try {
                const response = await axios.post('user/refresh-token', { refreshToken });
                const { accessToken } = response.data;

                // Store the new access token
                localStorage.setItem('token', accessToken);

                return true;
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('refreshToken');
                return false;
            }
        }

        // No refresh token found
        return false;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isAuthenticated()) {
                refreshToken();
            }
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;