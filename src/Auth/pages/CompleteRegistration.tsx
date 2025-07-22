import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocation, completeProfile } from '@/services/authService';

const CompleteRegistration = () => {
	const location = useLocation();
	const { userInfo, token } = location.state || {};
	const navigate = useNavigate();

	console.log(userInfo)

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		birth_date: '',
		region_id: null,
		district_id: null,
	});

	const isFormValid = () => {
		return (
			formData.firstName.trim() &&
			formData.lastName.trim() &&
			formData.phone.trim() &&
			formData.email.trim() &&
			formData.birth_date &&
			formData.region_id &&
			formData.district_id
		);
	};


	const [regions, setRegions] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		getLocation().then((res) => {
			console.log('User location:', res);
			setRegions(res);
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (token) {
				localStorage.setItem('token', token);
			}

			await completeProfile({
				email: formData.email,
				phone: formData.phone,
				first_name: formData.firstName,
				last_name: formData.lastName,
				birth_date: formData.birth_date,
				region_id: formData.region_id,
				district_id: formData.district_id,
			});
			localStorage.setItem('firstName', formData.firstName);
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	};


	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<form
					style={{ boxShadow: '0px 0px 30px 1px rgba(0, 0, 0, 0.07)' }}
					className="mt-8 p-6 space-y-6 rounded-[12px] bg-[#FFF]"
					onSubmit={handleSubmit}
				>
					<h2 className="text-center text-[18px] font-medium">
						Complete the registration
					</h2>
					<div className="space-y-4">
						<div className='space-y-1'>
							<div className='space-y-2'>
								<label htmlFor="phone" className="block text-base leading-6">
									Name according to documents
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									value={formData.firstName}
									onChange={handleChange}
									required
									className="block w-full p-4 border border-[#DFDFDF] bg-[#FFF] text-base leading-6 rounded-[12px]"
									placeholder="Name on the passport / ID card"
								/>
								<input
									id="lastName"
									name="lastName"
									type="text"
									value={formData.lastName}
									onChange={handleChange}
									required
									className="block w-full p-4 border border-[#DFDFDF] bg-[#FFF] text-base leading-6 rounded-[12px]"
									placeholder="Surname on the passport / ID card"
								/>
							</div>

							<p className='text-sm leading-5 text-[#A7A7AA]'>It must match the data in the identity card.</p>
						</div>

						<div className='space-y-1'>
							<div className='space-y-2'>
								<label htmlFor="phone" className="block text-base leading-6">
									Date of birth
								</label>
								<input
									id="birth_date"
									name="birth_date"
									type="date"
									value={formData.birth_date}
									onChange={handleChange}
									className="block w-full p-4 border border-[#DFDFDF] bg-[#FFF] text-base leading-6 rounded-[12px]"
								/>
							</div>
							<p className='text-sm leading-5 text-[#A7A7AA]'>
								Registration is available for persons over the age of 18. No one on XHX will see your date of birth.
							</p>
						</div>

						<div className='space-y-1'>
							<div className='space-y-2'>
								<label htmlFor="phone" className="block text-base leading-6">
									Contact information
								</label>
								<input
									id="phone"
									name="phone"
									type="tel"
									value={formData.phone}
									onChange={handleChange}
									required
									className="block w-full p-4 border border-[#DFDFDF] bg-[#FFF] text-base leading-6 rounded-[12px]"
									placeholder="+998901234567"
								/>
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="block w-full p-4 border border-[#DFDFDF] bg-[#FFF] text-base leading-6 rounded-[12px]"
									placeholder="example@email.com"
								/>
							</div>
							<p className='text-sm leading-5 text-[#A7A7AA]'>It must match the data in the identity card.</p>
						</div>

						<select
							name="region_id"
							value={formData.region_id || ''}
							onChange={(e) => {
								const selectedRegionId = parseInt(e.target.value, 10);
								setFormData((prev) => ({
									...prev,
									region_id: selectedRegionId,
									district_id: null, // сбросить район
								}));
							}}
							className="block w-full p-4 border border-[#DFDFDF] bg-[#FFF] text-base leading-6 rounded-[12px]"
						>
							<option value="">Выберите регион</option>
							{regions.map((region) => (
								<option key={region.id} value={region.id}>
									{region.name}
								</option>
							))}
						</select>

						{formData.region_id && (
							<select
								name="district_id"
								value={formData.district_id || ''}
								onChange={(e) => {
									const selectedDistrictId = parseInt(e.target.value, 10);
									setFormData((prev) => ({
										...prev,
										district_id: selectedDistrictId,
									}));
								}}
								className="block w-full p-4 border border-[#DFDFDF] bg-[#FFF] text-base leading-6 rounded-[12px]"
							>
								<option value="">Выберите район</option>
								{regions
									.find((r) => r.id === formData.region_id)
									?.districts?.map((district) => (
										<option key={district.id} value={district.id}>
											{district.name}
										</option>
									))}
							</select>
						)}
					</div>

					<div className="flex space-x-4">
						<button
							type="submit"
							disabled={!isFormValid()}
							className={`w-full p-4 text-white rounded-[12px] transition ${isFormValid() ? 'bg-[#A84B31] cursor-pointer' : 'bg-[#EDBDB8] cursor-not-allowed'
								}`}
						>
							Confirm and continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CompleteRegistration;
