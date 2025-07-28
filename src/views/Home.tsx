import RentalListing from "@/components/RentalCard/RentalListing";
import HotelSearch from "@/components/Search/HotelSearch";

export default function Home() {
	
	return (
		<div>
			<div className="w-full bg-[#FAFAFA]">
				<HotelSearch />
			</div>
			<div className="w-full">
				<RentalListing />
			</div>
		</div>
	)
}
