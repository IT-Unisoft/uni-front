import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CompleteRegistration = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		dateOfBirth: '',
		email: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [agreedToTerms, setAgreedToTerms] = useState(false);

	const handleInputChange = (field, value) => {
		setFormData(prev => ({
			...prev,
			[field]: value
		}));

		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({
				...prev,
				[field]: ''
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required';
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required';
		}

		if (!formData.dateOfBirth) {
			newErrors.dateOfBirth = 'Date of birth is required';
		} else {
			const birthDate = new Date(formData.dateOfBirth);
			const today = new Date();
			const age = today.getFullYear() - birthDate.getFullYear();
			const monthDiff = today.getMonth() - birthDate.getMonth();

			if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}

			if (age < 18) {
				newErrors.dateOfBirth = 'You must be at least 18 years old';
			}
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		if (!agreedToTerms) {
			newErrors.terms = 'You must agree to the terms and conditions';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {

		if (!validateForm()) return;

		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			console.log('Registration completed:', formData);
			// Here you would typically redirect to success page or dashboard
		} catch (error) {
			console.error('Registration error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBack = () => {
		console.log('Navigate back to verification');
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<div className="px-4 py-4 flex items-center">
				<Button
					variant="ghost"
					size="icon"
					onClick={handleBack}
					className="rounded-full hover:bg-gray-100"
				>
					<ArrowLeft className="h-5 w-5 text-gray-600" />
				</Button>
			</div>

			<div className="flex-1 flex items-center justify-center p-6">
				<Card className="w-full max-w-[500px] border-0 shadow-lg">
					<CardHeader className="pb-6">
						<h1 className="text-[32px] font-medium text-gray-900 mb-4">
							Complete the registration
						</h1>
					</CardHeader>

					<CardContent>
						<div className="space-y-6">
							{/* Name Section */}
							<div className="space-y-4">
								<div>
									<Label className="text-gray-900 font-medium text-base mb-3 block">
										Name according to documents
									</Label>

									<div className="space-y-3">
										<Input
											type="text"
											value={formData.firstName}
											onChange={(e) => handleInputChange('firstName', e.target.value)}
											placeholder="Name on the passport / ID card"
											className={`h-14 text-base ${errors.firstName ? 'border-red-500' : ''}`}
										/>

										<Input
											type="text"
											value={formData.lastName}
											onChange={(e) => handleInputChange('lastName', e.target.value)}
											placeholder="Surname on the passport / ID card"
											className={`h-14 text-base ${errors.lastName ? 'border-red-500' : ''}`}
										/>
									</div>

									<p className="text-gray-500 text-sm mt-2">
										It must match the data in the identity card.
									</p>

									{(errors.firstName || errors.lastName) && (
										<Alert variant="destructive" className="py-2 mt-2">
											<AlertDescription className="text-sm">
												{errors.firstName || errors.lastName}
											</AlertDescription>
										</Alert>
									)}
								</div>
							</div>

							{/* Date of Birth Section */}
							<div className="space-y-4">
								<div>
									<Label className="text-gray-900 font-medium text-base mb-3 block">
										Date of birth
									</Label>

									<Input
										type="date"
										value={formData.dateOfBirth}
										onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
										placeholder="Write your date of birth"
										className={`h-14 text-base ${errors.dateOfBirth ? 'border-red-500' : ''}`}
									/>

									<p className="text-gray-500 text-sm mt-2">
										Registration is available for persons over the age of 18. No one on XHX will see your date of birth.
									</p>

									{errors.dateOfBirth && (
										<Alert variant="destructive" className="py-2 mt-2">
											<AlertDescription className="text-sm">
												{errors.dateOfBirth}
											</AlertDescription>
										</Alert>
									)}
								</div>
							</div>

							{/* Contact Information Section */}
							<div className="space-y-4">
								<div>
									<Label className="text-gray-900 font-medium text-base mb-3 block">
										Contact information
									</Label>

									<Input
										type="email"
										value={formData.email}
										onChange={(e) => handleInputChange('email', e.target.value)}
										placeholder="Email"
										className={`h-14 text-base ${errors.email ? 'border-red-500' : ''}`}
									/>

									<p className="text-gray-500 text-sm mt-2">
										We will send the confirmations and receipts to your email.
									</p>

									{errors.email && (
										<Alert variant="destructive" className="py-2 mt-2">
											<AlertDescription className="text-sm">
												{errors.email}
											</AlertDescription>
										</Alert>
									)}
								</div>
							</div>

							{/* Terms and Conditions */}
							<div className="space-y-4">
								<div className="flex items-start space-x-3">
									<input
										type="checkbox"
										id="terms"
										checked={agreedToTerms}
										onChange={(e) => setAgreedToTerms(e.target.checked)}
										className="mt-1 h-4 w-4 text-[#A84B31] border-gray-300 rounded focus:ring-[#A84B31]"
									/>
									<label htmlFor="terms" className="text-sm text-gray-600 leading-5">
										By clicking{' '}
										<span className="font-semibold text-gray-900">Agree and Continue</span>
										, I accept the following XHX documents:{' '}
										<a href="#" className="text-blue-600 underline hover:text-blue-800">
											Terms of Service
										</a>
										,{' '}
										<a href="#" className="text-blue-600 underline hover:text-blue-800">
											Payment Processing Terms
										</a>
										,{' '}
										<a href="#" className="text-blue-600 underline hover:text-blue-800">
											XHX Non-Discrimination Policy
										</a>
										{' '}and{' '}
										<a href="#" className="text-blue-600 underline hover:text-blue-800">
											Privacy Policy
										</a>
										.
									</label>
								</div>

								{errors.terms && (
									<Alert variant="destructive" className="py-2">
										<AlertDescription className="text-sm">
											{errors.terms}
										</AlertDescription>
									</Alert>
								)}
							</div>

							{/* Submit Button */}
							<Button
								onClick={handleSubmit}
								disabled={isLoading}
								className="w-full h-14 bg-[#A84B31] text-white font-semibold text-base mt-8 disabled:opacity-50"
							>
								{isLoading ? 'Processing...' : 'Confirm and continue'}
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CompleteRegistration;