import Logo from '@/assets/Logo.svg'
import AppStore from '@/assets/AppStore.png'
import GooglePlay from '@/assets/GooglePlay.svg'
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa'

function Footer() {
	return (
		<div className="w-full flex flex-col items-start gap-[64px] self-stretch px-10 pt-[64px] pb-[48px] bg-white shadow-[0_0_10px_1px_rgba(0,0,0,0.07)]">
			<div className="w-full flex justify-between">
				<div className='flex flex-col gap-8 items-start'>
					<img src={Logo} alt="" />
					<p className='text-[#6C6B6B] text-[16px] leading-6'>
						Explore Freely, Stay Comfortably, <br />
						Connect Everywhere.
					</p>
					<ul className='flex gap-8 text-[16px] font-medium'>
						<li>Menu 1</li>
						<li>Menu 2</li>
						<li>Menu 3</li>
						<li>Menu 4</li>
					</ul>
				</div>
				<div className='flex flex-col gap-[16px] items-start'>
					<p>Download</p>
					<img src={AppStore} alt="" />
					<img src={GooglePlay} alt="" />
				</div>
			</div>

			<div className="flex pt-[var(--spacing---32,32px)] justify-between items-center self-stretch border-t border-t-[var(--Base-Border,#DFDFDF)]">
				<p className='text-[#A4A7AE] text-[16px] leading-6'>© 2024 UNIREALTY. All rights reserved.</p>
				<ul className='flex items-center gap-9 text-[#A4A7AE] text-[24px]'>
					<li>
						<FaInstagram />
					</li>
					<li>
						<FaTelegram />
					</li>
					<li>
						<FaYoutube />
					</li>
					<li>
						<FaFacebook />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Footer