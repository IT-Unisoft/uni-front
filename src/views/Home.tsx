import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import RentalListing from "@/components/RentalCard/RentalListing";
import HotelSearch from "@/components/Search/HotelSearch";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	const handleUserButtonClick = () => {
		navigate('/login');
	};
	
	return (
		<div>
			<div className="w-full bg-[#FFFFFF] container mx-auto px-10">
				<Navbar onUserButtonClick={handleUserButtonClick} />
			</div>
			<div className="w-full bg-[#FAFAFA] container mx-auto px-10">
				<HotelSearch />
			</div>
			<div className="w-full container mx-auto px-10">
				<RentalListing />
			</div>
			<div className="w-full mt-[100px]">
				<Footer />
			</div>
		</div>
	)
}
