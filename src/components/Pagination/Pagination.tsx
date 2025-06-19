import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
	currentPage = 1,
	totalPages = 10,
	onPageChange = () => { }
}) => {
	const handlePageClick = (page) => {
		if (page !== currentPage && page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const renderPageNumbers = () => {
		const pages = [];

		pages.push(1);

		if (currentPage > 4) {
			pages.push('...');
		}

		for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
			if (!pages.includes(i)) {
				pages.push(i);
			}
		}

		if (currentPage < totalPages - 3) {
			pages.push('...');
		}

		if (totalPages > 1) {
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className="flex items-center justify-center">
			<div className="flex items-center space-x-10">
				<button
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<ChevronLeft className="w-4 h-4 mr-2" />
					Previous
				</button>

				<div className="flex items-center space-x-1 mx-4">
					{renderPageNumbers().map((page, index) => {
						if (page === '...') {
							return (
								<span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
									...
								</span>
							);
						}

						const isActive = page === currentPage;

						return (
							<button
								key={page}
								onClick={() => handlePageClick(page)}
								className={`w-10 h-10 rounded-xl font-medium transition-colors ${isActive
										? 'bg-red-600 text-white shadow-md'
										: page === 3
											? 'bg-pink-100 text-pink-600'
											: 'text-gray-700 hover:bg-gray-100'
									}`}
							>
								{page}
							</button>
						);
					})}
				</div>

				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Next
					<ChevronRight className="w-4 h-4 ml-2" />
				</button>
			</div>
		</div>
	);
};

export default function PaginationDemo() {
	const [currentPage, setCurrentPage] = React.useState(1);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="bg-white rounded-lg shadow-sm">
				<Pagination
					currentPage={currentPage}
					totalPages={10}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}