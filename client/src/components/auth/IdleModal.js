import React, { useEffect, useRef, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import Modal from './Modal';

const IdleModal = () => {
    const IDLE_TIMEOUT = 60000; // 50 seconds in milliseconds
    const ALERT_TIMEOUT = IDLE_TIMEOUT / 2; // Half of the idle timeout

    const [showAlert, setShowAlert] = useState(false);
    const idleTimerRef = useRef(null);

    const onIdle = () => {
        // User has been idle for the specified timeout period
        // Perform logout actions here
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
    };

    const onActive = () => {
        // User is active again
        setShowAlert(false);
    };

    const onAction = () => {
        // User performed an action (e.g., moved the mouse, pressed a key)
        setShowAlert(false);
    };

    const { getRemainingTime, reset } = useIdleTimer({
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

    return (
        <Modal open={showAlert} onClose={() => setShowAlert(false)}>
            <div className="idle-alert">
                <p>You've been idle for a while. Do you want to stay logged in?</p>
                <button onClick={handleStayLoggedIn}>Yes, keep me logged in</button>
            </div>
        </Modal>
    );
};

export default IdleModal;