import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import Login from './Views/Login';
import Navbar from './Components/Navbar';
import NotFound from './Views/NotFound';
import UserProfile from './Views/UserProfile';
import TermsAndConditions from './Views/TermsAndConditions';
import DashboardView from './Views/DashboardView';

const AppRoutes = () => {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/dashboard" element={<DashboardView />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;