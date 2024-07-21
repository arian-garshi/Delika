import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signInWithGoogle, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../Utils/Firebase';
import { fetchUserById, createUserProfile } from '../Utils/Sanity';
import { UserProfile } from '../Utils/Interfaces';
import { communicateFirebaseError } from '../Components/AuthForm';

const useAuthMutations = () => {
    const queryClient = useQueryClient();

    const useGoogleSignInMutation = ({ setFirebaseError }: { setFirebaseError: (arg0: string) => void }) => {
        return useMutation({
            mutationFn: signInWithGoogle,
            onError: (error) => {
                console.error('Google sign-in error:', error);
                setFirebaseError('Ukjent feil ved innlogging med Google');
            },
            onSuccess: async (result) => {
                const { uid, displayName, email } = result.user;
                const sanityUserData = await fetchUserById(uid);
                if (sanityUserData) {
                    queryClient.setQueryData(['userData'], sanityUserData);
                } else {
                    const newUser: UserProfile = {
                        name: displayName,
                        email,
                        userId: uid,
                        userType: 'customer',
                        lastLogin: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                    };
                    await createUserProfile(newUser);
                    queryClient.setQueryData(['userData'], newUser);
                }
            },
        });
    };

    const useEmailSignInMutation = ({ email, password, setFirebaseError }: { email: string; password: string; setFirebaseError: (arg0: string) => void }) => {
        return useMutation({
            mutationFn: async () => {
                const result = await signInWithEmailAndPassword(email, password);
                const { uid } = result.user;
                const sanityUserData = await fetchUserById(uid);
                if (sanityUserData) {
                    queryClient.setQueryData(['userData'], sanityUserData);
                } else {
                    const newUser: UserProfile = {
                        name: result.user.displayName,
                        email: result.user.email,
                        userId: uid,
                        userType: 'customer',
                        lastLogin: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                    };
                    await createUserProfile(newUser);
                    queryClient.setQueryData(['userData'], newUser);
                }
            },
            onError: (error) => {
                const errorMessage = communicateFirebaseError(error);
                setFirebaseError(errorMessage);
            },
        });
    };

    const useRegisterMutation = ({ email, password, firstName, lastName, setFirebaseError }: { email: string; password: string; firstName: string; lastName: string; setFirebaseError: (arg0: string) => void }) => {
        return useMutation({
            mutationFn: async () => {
                const result = await createUserWithEmailAndPassword(email, password);
                const { uid } = result.user;
                const newUser: UserProfile = {
                    name: `${firstName} ${lastName}`,
                    email,
                    userId: uid,
                    userType: 'customer',
                    lastLogin: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                };
                await createUserProfile(newUser);
                queryClient.setQueryData(['userData'], newUser);
            },
            onError: (error) => {
                const errorMessage = communicateFirebaseError(error);
                setFirebaseError(errorMessage);
            },
        });
    };

    return {
        useGoogleSignInMutation,
        useEmailSignInMutation,
        useRegisterMutation,
    };
};

export default useAuthMutations;
