import PaginationDemo from "@/components/Pagination/Pagination";
import RentalCard from "@/components/RentalCard/RentalCard";
import { Button } from "@/components/ui/button";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

function RentalListing() {
	const rentals = Array(20).fill(null);

	return (
		<div className="w-full">
			<h2 className='text-[30px] font-medium mt-[32px] mb-[16px]'>Most popular variants for you</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
				{rentals.map((_, index) => (
					<RentalCard key={index} />
				))}
			</div>
			<div className="w-full">
				<Button className="w-full my-8 bg-[#A84B31] flex items-center gap-3 py-4">
					Show More <span><MdKeyboardDoubleArrowDown className="w-6 h-6" /></span>
				</Button>
				<PaginationDemo />
			</div>
		</div>
	);
}

export default RentalListing;
