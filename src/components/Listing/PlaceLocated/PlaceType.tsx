import React from 'react'

export default function PlaceType() {
	const [selectedPlaceType, setSelectedPlaceType] = React.useState('kvartira');

	const placeTypes = [
		{
			id: 'kvartira',
			name: 'Kvartira',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-gray-700">
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
					<rect x="7" y="7" width="3" height="3" />
					<rect x="14" y="7" width="3" height="3" />
					<rect x="7" y="14" width="3" height="3" />
					<rect x="14" y="14" width="3" height="3" />
				</svg>
			)
		},
		{
			id: 'uy',
			name: 'Uy',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-gray-700">
					<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
					<polyline points="9,22 9,12 15,12 15,22" />
				</svg>
			)
		},
		{
			id: 'dacha',
			name: 'Dacha',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-gray-700">
					<path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
					<path d="m9 22 3-8 3 8" />
					<path d="M2 10.6L12 2l10 8.6" />
				</svg>
			)
		},
		{
			id: 'dam-olish-maskani',
			name: 'Dam olish maskani',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-gray-700">
					<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
					<polyline points="14,2 14,8 20,8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
					<polyline points="10,9 9,9 8,9" />
				</svg>
			)
		},
		{
			id: 'noturar-binolar',
			name: 'Noturar binolar',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full text-gray-700">
					<polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
					<line x1="12" y1="22" x2="12" y2="15.5" />
					<polyline points="22,8.5 12,15.5 2,8.5" />
					<polyline points="2,8.5 12,2 22,8.5" />
				</svg>
			)
		}
	];

	const handleSelect = (event) => {
		setSelectedPlaceType(event.target.value);
	};

	const handleNext = () => {
		console.log('Selected:', selectedPlaceType);
	};

	const handleBack = () => {
		console.log('back');
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<div className="w-full">
				<h1 className="text-2xl font-semibold text-gray-800 text-center mb-12">
					Which of these best describes your place?
				</h1>

				<fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-[760px] mx-auto">
					<legend className="sr-only">Select your place type</legend>

					{placeTypes.map((placeType, index) => (
						<div key={placeType.id} className={index === 3 ? "md:col-start-1" : ""}>
							<input
								type="radio"
								id={placeType.id}
								name="placeType"
								value={placeType.id}
								checked={selectedPlaceType === placeType.id}
								onChange={handleSelect}
								className="sr-only peer"
							/>
							<label
								htmlFor={placeType.id}
								className={`
									block border-2 rounded-lg p-6 bg-white cursor-pointer transition-colors
									hover:bg-red-50
									peer-focus:ring-2 peer-focus:ring-[#A84B31] peer-focus:ring-opacity-50
									${selectedPlaceType === placeType.id
										? 'border-[#A84B31] bg-[#F5F5F5]'
										: 'border-gray-200'
									}
								`}
							>
								<div className="flex justify-center items-center gap-2">
									<div className="w-8 h-8">
										{placeType.icon}
									</div>
									<span className="text-gray-800 font-medium">{placeType.name}</span>
								</div>
							</label>
						</div>
					))}
				</fieldset>

				<div className="flex justify-between items-center max-w-[760px] mx-auto">
					<button
						type="button"
						onClick={handleBack}
						className="px-6 py-2 border border-[#DFDFDF] rounded-md text-gray-600 hover:text-gray-800 transition-colors"
					>
						Back
					</button>
					<button
						type="button"
						onClick={handleNext}
						className="px-8 py-3 bg-[#A84B31] text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	)
}