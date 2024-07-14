import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import ShopDetails from './Views/ShopDetails';
import Login from './Views/Login';
import Navbar from './Components/Navbar';
import NotFound from './Views/NotFound';
import UserProfile from './Views/UserProfile';
import TermsAndConditions from './Views/TermsAndConditions';
import ShopCards from './Views/ShopCards';

const AppRoutes = () => {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/partners" element={<ShopCards />} />|
                <Route path="/partners/:slug" element={<ShopDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;