import { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { signInWithGoogle, signInWithEmailAndPassword, registerUser, onAuthStateChange } from '../Utils/Firebase'; // Adjust the import paths as necessary
import { Google } from '@mui/icons-material';
import styled from 'styled-components';

const StyledLinkSpan = styled.span`
     //theme primary color
     color: #D2415B;

    cursor: pointer;
`;
const FirebaseAuthUI = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fornavn, setFornavn] = useState('');
    const [etternavn, setEtternavn] = useState('');
    const [virksomhet, setVirksomhet] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [signedInUser, setSignedInUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<{ email?: string, password?: string, general?: string }>({});

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            console.log('Sign in successful', result);
        } catch (error) {
            console.error('Google sign-in error:', error);
            setErrors({ general: 'Google sign-in error' });
        }
    };

    const handleEmailSignIn = async () => {
        try {
            const result = await signInWithEmailAndPassword(email, password);
            console.log('Sign in successful', result);
        } catch (error: any) {
            console.error(error);
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                setErrors({ email: 'Invalid email' });
            } else if (error.code === 'auth/wrong-password') {
                setErrors({ password: 'Incorrect password' });
            } else {
                setErrors({ general: 'An unknown error occurred' });
            }
        }
    };

    const handleRegister = async () => {
        try {
            const result = await registerUser(email, password, fornavn, etternavn, virksomhet);
            console.log('Registration successful', result);
        } catch (error: any) {
            console.log(error.message);
            const newErrors: { email?: string, password?: string, general?: string } = {};
            if (error.code === 'auth/email-already-in-use') {
                newErrors.email = 'Email already in use';
            }
            if (error.code === 'auth/weak-password') {
                newErrors.password = 'Password is too weak';
            }
            if (error.code === 'auth/invalid-email') {
                newErrors.email = 'Invalid email';
            }
            if (!newErrors.email && !newErrors.password) {
                newErrors.general = 'An unknown error occurred';
            }
            setErrors(newErrors);
            console.error(error.code);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChange((user) => {
            if (user) {
                setSignedInUser(user);
            } else {
                setSignedInUser(null);
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const isRegisterEnabled = email && password && fornavn && etternavn && virksomhet;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (signedInUser) {
        return (
            <div>
                <h2>Welcome, {signedInUser.email}</h2>
            </div>
        );
    }

    return (
        <div>
            <h2>{isRegisterMode ? 'Register' : 'Logg inn'}</h2>
            <Button
                onClick={handleGoogleSignIn}
                variant='outlined'
                color='secondary'
                startIcon={<Google />}
            //add googles color to the background

            > Logg inn med Google
            </Button>



            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
            />

            {isRegisterMode && (
                <>
                    <TextField
                        margin="dense"
                        id="fornavn"
                        label="Fornavn"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={fornavn}
                        onChange={(e) => setFornavn(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="etternavn"
                        label="Etternavn"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={etternavn}
                        onChange={(e) => setEtternavn(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="virksomhet"
                        label="Navn på virksomhet"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={virksomhet}
                        onChange={(e) => setVirksomhet(e.target.value)}
                    />
                </>
            )}

            {errors.general && (
                <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
                    {errors.general}
                </Typography>
            )}

            <Button
                variant='contained'
                onClick={isRegisterMode ? handleRegister : handleEmailSignIn}
                disabled={isRegisterMode && !isRegisterEnabled}
                style={{ marginTop: '10px' }}
            >
                {isRegisterMode ? 'Register' : 'Logg inn'}
            </Button>

            <div style={{ marginTop: '10px' }}>
                {isRegisterMode ? (
                    <p>
                        Allerede en bruker?{' '}
                        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { setIsRegisterMode(false); setErrors({}); }}>
                            Logg inn
                        </span>
                    </p>
                ) : (
                    <p>
                        Ny bruker?{' '}
                        <StyledLinkSpan onClick={() => { setIsRegisterMode(true); setErrors({}); }}>
                            Registrer
                        </StyledLinkSpan>
                    </p>
                )}
            </div>
        </div >
    );
};

export default FirebaseAuthUI;
