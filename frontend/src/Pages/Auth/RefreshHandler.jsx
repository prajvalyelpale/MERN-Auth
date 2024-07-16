import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RefreshHandler = ({ setIsAuth }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuth(true);
        if (localStorage.getItem('token')) {
            navigate('/product');
        }
    }, [navigate, setIsAuth]);

    return null;
}

export default RefreshHandler;
