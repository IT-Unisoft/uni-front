import { useState } from 'react';
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiSliders } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { DatePickerWithRange } from './DatePicker';


function HotelSearch() {
	const [activeView, setActiveView] = useState('All');

	return (
		<div className="w-full py-[30px]">
			<div className="mb-8">
				<h1
					style={{ letterSpacing: "-0.72px" }}
					className="text-[48px] font-bold text-foreground leading-tight"
				>
					Find Your Perfect Stay
				</h1>
			</div>

			<Card className="w-full p-7 mb-6 rounded-[20px] bg-white shadow-[0_0_10px_1px_rgba(0,0,0,0.07)]">
				<div className="flex items-center gap-[30px]">
					<div className="flex-1 relative border border-[#DFDFDF] rounded-[12px]">
						<div className="flex items-center gap-3 px-3 py-6 rounded-xl hover:bg-accent transition-colors">
							<FiMapPin className="w-5 h-5 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Search location"
								className="flex-1 border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground"
							/>
						</div>
					</div>

					<div className="flex-1 relative border border-[#DFDFDF]  px-3 py-[18px] rounded-[12px] hover:bg-accent transition-colors">
						<DatePickerWithRange />
					</div>

					<div className="flex-1 relative border border-[#DFDFDF] rounded-[12px]">
						<div className="flex items-center gap-3 px-3 py-6 rounded-xl hover:bg-accent transition-colors">
							<FiUsers className="w-5 h-5 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Add guests"
								className="flex-1 border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground"
							/>
						</div>
					</div>

					<Button
						className="w-[150px] h-[74px] rounded-[20px] bg-[#BC5A3C] hover:bg-[#A64D35] text-white text-base font-medium transition-colors shadow-lg hover:shadow-xl flex items-center"
					>
						<FiSearch className="w-5 h-5 mr-2" />
						Search
					</Button>

				</div>
			</Card>

			<div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
				<Button
					className="bg-[#BC5A3C] hover:bg-[#A64D35] text-white border-[#BC5A3C] hover:border-[#A64D35] px-6 py-3 rounded-xl font-medium transition-colors"
				>
					<FiSliders className="w-4 h-4 mr-2" />
					Filters
				</Button>

				<div className="flex items-center gap-8">
					<span className="text-foreground font-medium">View:</span>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<Checkbox id="terms" className='border border-gray-300' />
							<Label htmlFor="terms">All</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox id="terms" className='border border-gray-300' />
							<Label htmlFor="terms">Hotels</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox id="terms" className='border border-gray-300' />
							<Label htmlFor="terms">Rentals</Label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HotelSearch;