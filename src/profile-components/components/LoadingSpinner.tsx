import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import { LoadingSpinnerProps } from '../types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ onUserButtonClick }) => {
	return (
		<>
			<div className="w-full bg-[#FFFFFF] container mx-auto px-10">
				<Navbar onUserButtonClick={onUserButtonClick} />
			</div>
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Загрузка профиля...</p>
				</div>
			</div>
		</>
	);
};

export default LoadingSpinner;

