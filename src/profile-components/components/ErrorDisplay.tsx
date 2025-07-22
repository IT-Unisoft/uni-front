import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import { ErrorDisplayProps } from '../types';

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onUserButtonClick }) => {
	return (
		<>
			<div className="w-full bg-[#FFFFFF] container mx-auto px-10">
				<Navbar onUserButtonClick={onUserButtonClick} />
			</div>
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
					>
						Попробовать снова
					</button>
				</div>
			</div>
		</>
	);
};

export default ErrorDisplay;

