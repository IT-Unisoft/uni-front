import Login from "./Auth/pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import CompleteRegistration from "./Auth/pages/CompleteRegistration";
import Home from "./views/Home";
import PrivateRoute from "./components/Private/PrivateRoute";
import { Profile } from "./profile-components";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Listings from "./components/Listing/Listings";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

export default function App() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handleUserButtonClick = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full bg-[#FFFFFF] container mx-auto px-10">
                <Navbar onUserButtonClick={handleUserButtonClick} />
            </div>

            <div className="flex-grow w-full container mx-auto px-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onNavigateBack={() => navigate('/')} />} />
                    <Route path="/complete-registration" element={<CompleteRegistration />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/host/listings" element={<Listings />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>

            <div className="w-full mt-[100px]">
                <Footer />
            </div>
        </div>
    );
}