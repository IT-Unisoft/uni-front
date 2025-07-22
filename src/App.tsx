import Login from "./Auth/pages/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import CompleteRegistration from "./Auth/pages/CompleteRegistration";
import Home from "./views/Home";
import PrivateRoute from "./components/Private/PrivateRoute";
import { Profile } from "./profile-components";

export default function App() {
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem("token");

    return (
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
        </Routes>
    )
}
