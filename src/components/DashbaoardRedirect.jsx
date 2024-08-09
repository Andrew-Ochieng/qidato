import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import publicAxios from '../api/publicAxios';

const DashboardRedirect = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            try {
                const response = await publicAxios.get('/dashboard-redirect/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                navigate(response.data.redirect_url);
            } catch (error) {
                console.error("Redirect failed:", error);
            }
        };

        fetchRedirectUrl();
    }, [token, navigate]);

    return <div>Loading...</div>;
};

export default DashboardRedirect;
