import { FaRegHeart } from 'react-icons/fa'
import Home from '../../assets/RentalHome.png'

function RentalCard() {
	return (
		<div className='max-w-[322px]'>
			<div className='relative'>
				<img className='w-[322px] h-[210px] rounded-[12px]' src={Home} alt="" />

				<div className="absolute inset-x-0 top-0 flex justify-between items-center p-2">
					<ul className='flex items-center gap-2'>
						<li className='rounded-[20px] px-[8px] py-[6px] text-[#19B26B] bg-[#D9FAEA]'>Low price</li>
						<li className='rounded-[20px] px-[8px] py-[6px] text-[#175CD3] bg-[#EFF8FF]'>High rating</li>
					</ul>

					<div>
						<FaRegHeart className='cursor-pointer' />
					</div>
				</div>
			</div>

			<div className='mt-2 flex flex-col items-start gap-1 self-stretch'>
				<h2 className='text-[20px]'>Eiffel Tower Apartment</h2>
				<div>
					<p className='text-[14px] text-[#6C6B6B] leading-5'>Paris, France</p>
					<ul className='flex items-center gap-1 self-stretch text-[14px] text-[#6C6B6B] leading-5'>
						<li>2 people</li>
						&bull;
						<li>1 bedroom</li>
						&bull;
						<li>1 bathroom</li>
					</ul>
				</div>
				<h4 className='text-[16px] font-bold'>5,600,000 UZS <span className='font-normal leading-6'>/night</span></h4>
			</div>
		</div>
	)
}

export default RentalCard