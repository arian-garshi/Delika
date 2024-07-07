import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import ProjectDetails from './Views/ProjectDetails';
import Navbar from './Components/Navbar';
import NotFound from './Views/NotFound';
import UserProfile from './Views/UserProfile';
import TermsAndConditions from './Views/TermsAndConditions';

const AppRoutes = () => {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;