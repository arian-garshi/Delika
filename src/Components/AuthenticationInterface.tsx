import { useState, useEffect, SetStateAction } from 'react';
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

const signInRequirements = {
    "isInUse": "E-postadressen er allerede i bruk",
    "incorrectPassword": "Feil passord eller e-postadresse",
    "noUser": "Brukeren finnes ikke",
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
};

const passwordConfirmationRequirements = {
    "match": "Passordene må være like",
};

const nameRequirements = {
    "minTwoChar": "Feltet må inneholde minst 2 tegn",
};


const communicateFirebaseError = (error: any) => {
    switch (error.code) {
        case 'auth/invalid-email':
            return emailRequirements['correctFormat'];
        case 'auth/weak-password':
            return passwordRequirements['sixCharacters'];
        case 'auth/email-already-in-use':
            return signInRequirements['isInUse'];
        case 'auth/wrong-password':
            return signInRequirements['incorrectPassword'];
        case 'auth/user-not-found':
            return signInRequirements['noUser'];
        default:
            return error.message;
    }
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

    const [firebaseErrors, setFirebaseErrors] = useState<string[]>([]);
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<string[]>([]);
    const [nameErrors, setNameErrors] = useState<string[]>([]);
    const [lastNameErrors, setLastNameErrors] = useState<string[]>([]);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            if (result instanceof Error) {
                // add the error to the firebaseErrors
                setFirebaseErrors([...firebaseErrors, result.message]);
                return;
            }
            console.log('Sign in successful', result);
        } catch (error) {
            console.error('Google sign-in error:', error);
            setFirebaseErrors([...firebaseErrors, 'Google sign-in error']);
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
        try {
            const result = await signInWithEmailAndPassword(email, password);
            if (result instanceof Error) {
                console.log('Sign in error:', result.message);
                const errorMessage = communicateFirebaseError(result);
                setFirebaseErrors([...firebaseErrors, errorMessage]);
                return;
            }
            console.log('Sign in successful', result);
        } catch (error) {
            console.error('Email sign-in error:', error);
            setFirebaseErrors([...firebaseErrors, 'Email sign-in error']);
        }
    };

    const handleRegister = async () => {
        try {
            const result = await registerUser(email, password, firstName, lastName);

            if (result instanceof Error) {
                console.log('Register error:', result.message);
                const errorMessage = communicateFirebaseError(result);
                setFirebaseErrors([...firebaseErrors, errorMessage]);
                return;
            }
            console.log('Register successful', result);
        } catch (error: any) {
            console.log(error.message);
            setFirebaseErrors([...firebaseErrors, error.message]);
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
                helperText={emailErrors}
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
                helperText={isRegisterMode && passwordErrors}
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
                        helperText={passwordConfirmationErrors}
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
                        helperText={nameErrors}
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
                        helperText={lastNameErrors}
                        onBlur={validateLastName}
                    />
                </>
            )}

            {firebaseErrors.length > 0 && (
                <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
                    {firebaseErrors.join(', ')}
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
                        <StyledLinkSpan onClick={() => { setIsRegisterMode(false); }}>
                            Logg inn
                        </StyledLinkSpan>
                    </p>
                ) : (
                    <p>
                        Ny bruker?{' '}
                        <StyledLinkSpan onClick={() => { setIsRegisterMode(true); }}>
                            Registrer
                        </StyledLinkSpan>
                    </p>
                )}
            </div>
        </Wrapper >
    );
};

export default FirebaseAuthUI;
