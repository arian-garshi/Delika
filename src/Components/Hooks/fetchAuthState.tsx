import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { onAuthStateChange } from '../../Utils/Firebase'; // Adjust the import paths as necessary

const fetchAuthState = () => {
    return new Promise((resolve) => {
        onAuthStateChange((user) => {
            resolve(user);
        });
    });
};

const useAuth = () => {
    return useQuery<any, Error>({
        queryKey: ['authorizedUser'],
        queryFn: fetchAuthState,
    });
};

export default useAuth;
