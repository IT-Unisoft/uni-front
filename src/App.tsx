import Navbar from "@/components/Navbar/Navbar.tsx";
import HotelSearch from "./components/Search/HotelSearch";
import RentalListing from "./views/RentalListing";
import { LoginFormData } from "./types/types";
import LoginPage from "./Auth/pages/LoginPage";
import { useState } from "react";
import Footer from "./views/Footer";

type Page = 'home' | 'login';

export default function App() {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const handleUserButtonClick = () => {
        setCurrentPage('login');
    };

    const handleNavigateBack = () => {
        setCurrentPage('home');
    };

    const handleLoginSuccess = (data: LoginFormData) => {
        console.log('Login successful:', data);

        alert(`Welcome! Phone: ${data.phoneNumber}, City: ${data.city}`);
        setCurrentPage('home');
    };

    if (currentPage === 'login') {
        return (
            <LoginPage
                onNavigateBack={handleNavigateBack}
                onLoginSuccess={handleLoginSuccess}
            />
        );
    }
    return (
        <div>
            <div className={`w-full bg-[#FFFFFF] container mx-auto px-10`}>
                <Navbar onUserButtonClick={handleUserButtonClick} />
            </div>
            <div className={`w-full bg-[#FAFAFA] container mx-auto px-10`}>
                <HotelSearch />
            </div>
            <div className={`w-full container mx-auto px-10`}>
                <RentalListing />
            </div>
            <div className={`w-full mt-[100px]`}>
                <Footer />
            </div>
        </div>
    )
}
