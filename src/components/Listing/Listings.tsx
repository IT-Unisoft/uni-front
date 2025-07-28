import { LayoutGrid, Plus } from "lucide-react";
import ListingNone from "@/assets/ListingNone.png"
import PlaceLocated from "./PlaceLocated/PlaceLocated";
import PlaceType from "./PlaceLocated/PlaceType";

export default function Listings() {
	return (
		<div className="w-full py-14">
			<div className="flex justify-between items-center mb-12">
				<h2 className="font-medium text-[30px] leading-[100%] ">You don’t have any listings yet</h2>
				<ul className="flex items-center gap-4">
					<li className="p-2 rounded-md cursor-pointer">
						<LayoutGrid className="text-[#A7A7AA]" />
					</li>
					<li className="bg-[#F5F5F5] p-2 rounded-md cursor-pointer hover:rotate-[90deg] hover:scale-110 transition-all ease-linear">
						<Plus />
					</li>
				</ul>
			</div>

			<div className="w-full flex justify-center">
				<div className="flex flex-col gap-4 text-center">
					<img className="max-w-[668px]" src={ListingNone} alt="" />
					<p className="text-[#6C6B6B] leading-6">Create listing with Unirealty and start getting booked.</p>
					<div>
						<button className="py-3 px-6 rounded-md border border-[#DFDFDF] bg-[#FFF] cursor-pointer">
							Create listing
						</button>
					</div>
				</div>
			</div>
			<PlaceLocated />
			<PlaceType />
		</div>
	)
}
