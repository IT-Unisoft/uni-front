import { MapPin, Navigation, Search } from "lucide-react";

export default function PlaceLocated() {
	return (
		<div className="w-full min-h-screen bg-white p-6">
			<div className="">
				<h1 className="text-3xl font-semibold mb-8">Where's your place located?</h1>

				<div className="flex gap-8">
					<div className="flex-1">
						<div className="w-full h-[500px] bg-gray-100 rounded-lg relative overflow-hidden">
							<div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 relative">
								<div className="absolute inset-0 opacity-20">
									<div className="absolute top-10 left-10 w-2 h-2 bg-pink-500 rounded-full"></div>
									<div className="absolute top-20 right-20 w-2 h-2 bg-pink-500 rounded-full"></div>
									<div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-500 rounded-full"></div>
									<div className="absolute bottom-10 right-10 w-2 h-2 bg-pink-500 rounded-full"></div>
								</div>
								<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
									<div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
										<MapPin className="w-5 h-5 text-white" />
									</div>
								</div>
								<div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded">
									Google
								</div>
							</div>
						</div>
					</div>

					<div className="w-80 space-y-4">
						<button className="w-full bg-[#B85C4A] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#A54A37] transition-colors">
							<Navigation className="w-5 h-5" />
							My current location
						</button>

						<button className="w-full bg-[#B85C4A] text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#A54A37] transition-colors">
							<MapPin className="w-5 h-5" />
							Locate on map
						</button>

						<div className="text-center text-gray-600 py-2">
							or write your address
						</div>

						<div className="relative">
							<input
								type="text"
								placeholder="Search"
								className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85C4A] focus:border-transparent"
							/>
							<Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
						</div>
					</div>
				</div>

				<div className="flex justify-between mt-12">
					<button
						className="py-3 px-8 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
					>
						Back
					</button>
					<button
						className="py-3 px-8 bg-[#B85C4A] text-white rounded-lg hover:bg-[#A54A37] transition-colors"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}