import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Views/HomeView';
import Login from './Views/LoginView';
import Navbar from './Components/Navbar';
import NotFound from './Views/NotFoundView';
import UserProfileView from './Views/UserProfileView';
import TermsAndConditions from './Views/TermsAndConditionsView';
import DashboardView from './Views/DashboardView';
import { useEffect, useState } from 'react';
import { onAuthStateChange } from './Utils/Firebase';
import { fetchUserById } from './Utils/Sanity';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { UserProfile } from './Utils/Interfaces';


const AppRoutes = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = onAuthStateChange(async (user) => {
            if (user) {
                const userData = await fetchUserById(user.uid);
                if (userData) {
                    queryClient.setQueryData(['userData'], userData);
                }

            } else {
                queryClient.setQueryData(['userData'], null);
            }
        });

        return unsubscribe;
    }, []);

    const { data: userData } = useQuery<UserProfile | null>({
        queryKey: ['userData']
    });


    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={ userData ? <Home /> : <Login />} />
                <Route path="/profile" element={ userData ? <UserProfileView /> : <Login />} />
                <Route path="/dashboard" element={ userData ? <DashboardView /> : <Login />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;