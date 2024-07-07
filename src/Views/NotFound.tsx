import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const NotFoundContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const ErrorCodeText = styled(Typography)({
    fontSize: '6rem',
    fontWeight: 'bold',
    color: 'red',
    marginBottom: '1rem',
});

const NotFoundText = styled(Typography)({
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
});

const CountdownText = styled(Typography)({
    marginBottom: '2rem',
});

const NotFound: React.FC = () => {
    const [countdown, setCountdown] = useState(7);
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown === 0) {
            navigate('/');
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    const handleGoBackNow = () => {
        navigate('/');
    };

    return (
        <NotFoundContainer>
            <ErrorCodeText>404</ErrorCodeText>
            <NotFoundText>URL not found</NotFoundText>
            <Typography>Sorry, the page you are looking for does not exist.</Typography>
            <CountdownText>Navigating back in {countdown}...</CountdownText>
            <Button variant="contained" color="primary" onClick={handleGoBackNow}>
                Go Back Now
            </Button>
        </NotFoundContainer>
    );
};

export default NotFound;
