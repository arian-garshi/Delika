import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Divider } from '@mui/material';
import { signInWithGoogle, signInWithEmailAndPassword, registerUser, onAuthStateChange } from '../Utils/Firebase'; // Adjust the import paths as necessary
import { Google } from '@mui/icons-material';
import styled from 'styled-components';

const StyledLinkSpan = styled.span`
     //theme primary color
     color: #D2415B;

    cursor: pointer;
`;

const Wrapper = styled.div`
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const FirebaseAuthUI = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fornavn, setFornavn] = useState('');
    const [etternavn, setEtternavn] = useState('');
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [signedInUser, setSignedInUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<{ email?: string, password?: string, general?: string }>({});

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            if (result instanceof Error) {
                setErrors({ general: result.message });
                return;
            }
            console.log('Sign in successful', result);
        } catch (error) {
            console.error('Google sign-in error:', error);
            setErrors({ general: 'Google sign-in error' });
        }
    };

    const handleEmailSignIn = async () => {
        try {
            const result = await signInWithEmailAndPassword(email, password);
            if (result instanceof Error) {
                console.log('Sign in error:', result.message);
                if (result.message === 'auth/invalid-email - Firebase: Error (auth/invalid-email).' || result.message === 'auth/user-not-found') {
                    setErrors({ email: 'Sjekk formatet på e-postadressen' });
                } else if (result.message === 'auth/invalid-credential - Firebase: Error (auth/invalid-credential).') {
                    setErrors({ general: 'E-postadressen eller passordet er feil' });
                } else {
                    setErrors({ general: result.message });
                }

                return;
            }
            console.log('Sign in successful', result);
        } catch (error) {
            console.error('Email sign-in error:', error);
            setErrors({ general: 'Email sign-in error' });
        }
    };

    const handleRegister = async () => {
        try {
            const result = await registerUser(email, password, fornavn, etternavn);

            if (result instanceof Error) {
                console.log('Register error:', result.message);
                if (result.message === 'auth/invalid-email - Firebase: Error (auth/invalid-email).') {
                    setErrors({ email: 'Sjekk formatet på e-postadressen' });
                } 
                if (result.message === 'auth/weak-password') {
                    setErrors({ password: 'Passordet er for svakt' });
                }
                if (result.message === 'auth/email-already-in-use - Firebase: Error (auth/email-already-in-use).') {
                    setErrors({ email: 'E-postadressen er allerede i bruk' });
                }
                return;
            }
            console.log('Register successful', result);
        } catch (error: any) {
            console.log(error.message);
            setErrors({ general: error.message });
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

    const isRegisterEnabled = email && password && fornavn && etternavn;

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

        <Wrapper>
            <h2>{isRegisterMode ? 'Register' : 'Logg inn'}</h2>
            {!isRegisterMode && (
                <>
                    <Button
                        onClick={handleGoogleSignIn}
                        variant='outlined'
                        color='secondary'
                        startIcon={<Google />}
                    > Logg inn med Google
                    </Button>

                    <Divider style={{ margin: '15px 0' }} />
                </>
            )}

            <TextField
                required
                autoFocus
                margin="dense"
                id="email"
                label="E-postadresse"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                
            />
            <TextField
                required
                margin="dense"
                id="password"
                label="Passord"
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
                        required
                        margin="dense"
                        id="password"
                        label="SKriv inn passord på nytt"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        required
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
                        required
                        margin="dense"
                        id="etternavn"
                        label="Etternavn"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={etternavn}
                        onChange={(e) => setEtternavn(e.target.value)}
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
                        <StyledLinkSpan onClick={() => { setIsRegisterMode(false); setErrors({}); }}>
                            Logg inn
                        </StyledLinkSpan>
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
        </Wrapper >
    );
};

export default FirebaseAuthUI;
