import { useState, useEffect, SetStateAction } from 'react';
import { Button, TextField, Divider, Alert } from '@mui/material';
import { signInWithGoogle, signInWithEmailAndPassword, registerUser, onAuthStateChange } from '../Utils/Firebase'; // Adjust the import paths as necessary
import { Google } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledLinkSpan = styled.span`
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

const signInRequirements = {
    "isInUse": "E-postadressen er allerede i bruk",
    "incorrectPassword": "Feil passord eller e-postadresse",
    "noUser": "Brukeren finnes ikke",
    "alreadyInUse": "E-post adressen er allerede i bruk",
    "wrongCredentials": "Feil e-postadresse eller passord",
    "tooManyAttempts": "For mange forsøk, prøv igjen senere eller tilbakestill passord",
};

const emailRequirements = {
    "correctFormat": "E-postadressen må være i riktig format",
};

const passwordRequirements = {
    "sixCharacters": "Passord må være minst 6 tegn",
    "oneNumber": "Passordet må inneholde minst ett tall",
    "oneUppercase": "Passordet må inneholde minst en stor bokstav",
    "oneLowercase": "Passordet må inneholde minst en liten bokstav",
    "oneSpecialChar": "Passordet må inneholde minst ett spesialtegn",
    "popUpClosed": "Popup lukket av bruker før innlogging var fullført",
};

const passwordConfirmationRequirements = {
    "match": "Passordene må være like",
};

const nameRequirements = {
    "minTwoChar": "Feltet må inneholde minst 2 tegn",
};


const communicateFirebaseError = (error: any) => {
    console.log(error);
    console.log(error.code);
    console.log(error.message);

    if (error.message.includes('auth/invalid-email'))
        return emailRequirements['correctFormat'];

    else if (error.message.includes('auth/weak-password'))
        return passwordRequirements['sixCharacters'];

    else if (error.message.includes('auth/email-already-in-use'))
        return signInRequirements['isInUse'];

    else if (error.message.includes('auth/wrong-password'))
        return signInRequirements['incorrectPassword'];

    else if (error.message.includes('auth/user-not-found'))
        return signInRequirements['noUser'];

    else if (error.message.includes('auth/invalid-credential'))
        return signInRequirements['wrongCredentials'];

    else if (error.message.includes('auth/popup-closed-by-user'))
        return passwordRequirements['popUpClosed'];

    else if (error.message.includes('auth/cancelled-popup-request'))
        return passwordRequirements['popUpClosed'];

    else if (error.message.includes('auth/too-many-requests'))
        return signInRequirements['tooManyAttempts'];


    else
        return error.message;

}

const FirebaseAuthUI = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [signedInUser, setSignedInUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [firebaseError, setFirebaseError] = useState<string>('');
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<string[]>([]);
    const [nameErrors, setNameErrors] = useState<string[]>([]);
    const [lastNameErrors, setLastNameErrors] = useState<string[]>([]);

    const handleGoogleSignIn = async () => {
        setFirebaseError('');
        try {
            const result = await signInWithGoogle();
            if (result instanceof Error) {
                const errorMessage = communicateFirebaseError(result);
                setFirebaseError(errorMessage);
                return;
            }
            console.log('Sign in successful', result);
        } catch (error) {
            console.error('Google sign-in error:', error);
            setFirebaseError('Ukjent feil ved innlogging med Google');
        }
    };

    const validateEmail = () => {

        if (email === '') return setEmailErrors([]);

        const errors = new Set<string>();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email.match(emailRegex)) {
            errors.add(emailRequirements['correctFormat']);
        } else {
            errors.delete(emailRequirements['correctFormat']);
        }

        setEmailErrors(Array.from(errors));
    };

    const validatePassword = () => {

        if (password === '') return setPasswordErrors([]);

        const errors = new Set<string>();

        if (password.length < 6) {
            errors.add(passwordRequirements['sixCharacters']);
        } else {
            errors.delete(passwordRequirements['sixCharacters']);
        }

        if (!password.match(/[0-9]/)) {
            errors.add(passwordRequirements['oneNumber']);
        } else {
            errors.delete(passwordRequirements['oneNumber']);
        }

        if (!password.match(/[A-Z]/)) {
            errors.add(passwordRequirements['oneUppercase']);
        } else {
            errors.delete(passwordRequirements['oneUppercase']);
        }

        if (!password.match(/[a-z]/)) {
            errors.add(passwordRequirements['oneLowercase']);
        } else {
            errors.delete(passwordRequirements['oneLowercase']);
        }

        if (!password.match(/[!@#$%^&*]/)) {
            errors.add(passwordRequirements['oneSpecialChar']);
        } else {
            errors.delete(passwordRequirements['oneSpecialChar']);
        }

        validatePasswordConfirmation();
        setPasswordErrors(Array.from(errors));

    };

    const validatePasswordConfirmation = () => {
        const errors = new Set<string>();

        if (password !== confirmPassword) {
            errors.add(passwordConfirmationRequirements['match']);
        } else {
            errors.delete(passwordConfirmationRequirements['match']);
        }

        setPasswordConfirmationErrors(Array.from(errors));
    }

    const validateName = () => {
        console.log("first name entered;", firstName)
        if (firstName === '') return setNameErrors([]);
        const errors = new Set<string>();

        if (firstName.length < 2) {
            errors.add(nameRequirements['minTwoChar']);
        } else {
            errors.delete(nameRequirements['minTwoChar']);
        }

        setNameErrors(Array.from(errors));
    }

    const validateLastName = () => {
        console.log("last name entered;", lastName)
        if (lastName === '') return setLastNameErrors([]);
        const errors = new Set<string>();

        if (lastName.length < 2) {
            errors.add(nameRequirements['minTwoChar']);
        } else {
            errors.delete(nameRequirements['minTwoChar']);
        }

        setLastNameErrors(Array.from(errors));
    }

    useEffect(() => {
        if (emailErrors.length > 0) validateEmail();
    }, [email]);

    useEffect(() => {
        validatePassword();
    }, [password]);

    useEffect(() => {
        validatePasswordConfirmation();
    }, [confirmPassword]);

    useEffect(() => {
        if (nameErrors.length > 0) validateName();
    }, [firstName]);

    useEffect(() => {
        if (lastNameErrors.length > 0) validateLastName();
    }, [lastName]);

    const handleEmailSignIn = async () => {
        setFirebaseError('');

        try {
            const result = await signInWithEmailAndPassword(email, password);
            if (result instanceof Error) {
                const errorMessage = communicateFirebaseError(result);
                setFirebaseError(errorMessage);
                return;
            }
            console.log('Sign in successful', result);
        } catch (error) {
            const errorMessage = communicateFirebaseError(error);
            setFirebaseError(errorMessage);
        }
    };

    const handleRegister = async () => {
        setFirebaseError('');

        try {
            const result = await registerUser(email, password, firstName, lastName);

            if (result instanceof Error) {
                const errorMessage = communicateFirebaseError(result);
                setFirebaseError(errorMessage);
                return;
            }
            console.log('Register successful', result);
        } catch (error: any) {
            console.log(error.message);
            const errorMessage = communicateFirebaseError(error);
            setFirebaseError(errorMessage);
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

    const isRegisterEnabled =
        emailErrors.length === 0 &&
        passwordErrors.length === 0 &&
        passwordConfirmationErrors.length === 0 &&
        nameErrors.length === 0 &&
        lastNameErrors.length === 0 &&
        email !== '' &&
        password !== '' &&
        confirmPassword !== '' &&
        firstName !== '' &&
        lastName !== '';

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
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: firebaseError ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{ opacity: firebaseError ? 1 : 0 }}
            >
                <Alert severity='error' >
                    {firebaseError}
                </Alert>
            </motion.div>

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
                onBlur={validateEmail}
                error={emailErrors.length > 0}
                helperText={emailErrors.join(', ')}
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
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => [setPassword(e.target.value)]}
                error={isRegisterMode && passwordErrors.length > 0}
                helperText={isRegisterMode && passwordErrors.join(', ')}

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
                        error={passwordConfirmationErrors.length > 0}
                        helperText={passwordConfirmationErrors.join(', ')}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="fornavn"
                        label="Fornavn"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={nameErrors.length > 0}
                        helperText={nameErrors.join(', ')}
                        onBlur={validateName}

                    />
                    <TextField
                        required
                        margin="dense"
                        id="etternavn"
                        label="Etternavn"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={lastNameErrors.length > 0}
                        helperText={lastNameErrors.join(', ')}
                        onBlur={validateLastName}
                    />
                </>
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
                        <StyledLinkSpan onClick={() => {
                            setIsRegisterMode(false); setFirebaseError('');
                        }}>
                            Logg inn
                        </StyledLinkSpan>
                    </p>
                ) : (
                    <p>
                        Ny bruker?{' '}
                        <StyledLinkSpan onClick={() => {
                            setIsRegisterMode(true); setFirebaseError('');
                        }}>
                            Registrer
                        </StyledLinkSpan>
                    </p>
                )}
            </div>
        </Wrapper >
    );
};

export default FirebaseAuthUI;
