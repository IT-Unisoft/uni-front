import React, { useState } from 'react';
import { Edit3, Save, X } from "lucide-react";
import { PhoneInput } from 'react-international-phone';
import { PersonalInfoTabProps } from '../types';
import 'react-international-phone/style.css';

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
	formData,
	isEditing,
	saving,
	regions,
	districts,
	loadingDistricts,
	onInputChange,
	onSave,
	onCancel,
	onEdit
}) => {
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [phoneError, setPhoneError] = useState('');

	const validateUzbekPhone = (phone: string) => {
		const cleanPhone = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');

		const uzbekPhoneRegex = /^\+998[0-9]{9}$/;

		if (!uzbekPhoneRegex.test(cleanPhone)) {
			return false;
		}

		const operatorCode = cleanPhone.substring(4, 6);
		const validOperatorCodes = ['90', '91', '93', '94', '95', '97', '98', '99', '88', '77', '71', '78'];

		return validOperatorCodes.includes(operatorCode);
	};

	const handlePhoneChange = (phone: string) => {
		const syntheticEvent = {
			target: {
				name: 'phone',
				value: phone.replace('+998', '') 
			}
		} as React.ChangeEvent<HTMLInputElement>;

		onInputChange(syntheticEvent);

		if (phone.length > 4) { 
			if (!validateUzbekPhone(phone)) {
				setPhoneError('Введите корректный узбекский номер телефона');
			} else {
				setPhoneError('');
			}
		} else {
			setPhoneError('');
		}
	};

	const validateField = (name: string, value: string) => {
		const fieldErrors: { [key: string]: string } = {};

		if (name === 'first_name' || name === 'last_name') {
			if (!value.trim()) {
				fieldErrors[name] = 'Поле обязательно для заполнения';
			} else if (/\d/.test(value) || /[^a-zA-Zа-яА-ЯёЁ\s\-]/.test(value)) {
				fieldErrors[name] = `${name === 'first_name' ? 'Имя' : 'Фамилия'} не должно содержать цифр или спецсимволов`;
			}
		}

		if (name === 'email') {
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!emailRegex.test(value)) {
				fieldErrors.email = 'Введите корректный email (только латиница)';
			}
		}

		if (name === 'phone') {
			const fullPhone = '+998' + value;
			if (value && !validateUzbekPhone(fullPhone)) {
				fieldErrors.phone = 'Введите корректный узбекский номер телефона';
			}
		}

		setErrors(prev => ({ ...prev, ...fieldErrors }));
	};

	const validate = () => {
		validateField('first_name', formData.first_name);
		validateField('last_name', formData.last_name);
		validateField('email', formData.email);
		validateField('phone', formData.phone);
		return Object.keys(errors).length === 0 && !phoneError;
	};

	const handleSave = () => {
		if (validate()) {
			onSave();
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		onInputChange(e);
		validateField(name, value);
	};

	const blockInvalidNameKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const invalidChars = /[0-9!@#$%^&*(),.?":{}|<>_=+[\]\\;/`~]/;
		if (invalidChars.test(e.key)) {
			e.preventDefault();
		}
	};

	const blockInvalidNamePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const paste = e.clipboardData.getData('text');
		if (/\d/.test(paste) || /[^a-zA-Zа-яА-ЯёЁ\s\-]/.test(paste)) {
			e.preventDefault();
		}
	};

	const blockCyrillicInEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (/[а-яА-ЯёЁ]/.test(e.key)) {
			e.preventDefault();
		}
	};

	const blockCyrillicPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const paste = e.clipboardData.getData('text');
		if (/[а-яА-ЯёЁ]/.test(paste)) {
			e.preventDefault();
		}
	};

	return (
		<div>
			<div className="px-6 py-4 border-b flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900">Личная информация</h2>
				<div className="flex gap-2">
					{isEditing ? (
						<>
							<button
								onClick={handleSave}
								disabled={saving}
								className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
							>
								<Save className="w-4 h-4 mr-2" />
								{saving ? 'Сохранение...' : 'Сохранить'}
							</button>
							<button
								onClick={onCancel}
								disabled={saving}
								className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
							>
								<X className="w-4 h-4 mr-2" />
								Отмена
							</button>
						</>
					) : (
						<button
							onClick={onEdit}
							className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							<Edit3 className="w-4 h-4 mr-2" />
							Редактировать
						</button>
					)}
				</div>
			</div>

			<div className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
						{isEditing ? (
							<>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									onKeyDown={blockCyrillicInEmail}
									onPaste={blockCyrillicPaste}
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
								/>
								{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
							</>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">{formData.email || 'Не указано'}</div>
						)}
					</div>

					{/* Телефон */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
						{isEditing ? (
							<>
								<div className="phone-input-container">
									<PhoneInput
										defaultCountry="uz"
										value={`+998${formData.phone}`}
										onChange={handlePhoneChange}
										inputProps={{
											className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${phoneError || errors.phone ? 'border-red-500' : 'border-gray-300'}`,
											placeholder: "+998 90 123 45 67"
										}}
										countrySelectorStyleProps={{
											buttonStyle: {
												display: 'none' // Скрываем кнопку выбора страны с флагом
											}
										}}
										disableCountryGuess={true}
										forceDialCode={true}
									/>
								</div>
								{(phoneError || errors.phone) && (
									<p className="text-red-500 text-sm mt-1">{phoneError || errors.phone}</p>
								)}
							</>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.phone ? `+998 ${formData.phone}` : 'Не указано'}
							</div>
						)}
					</div>

					{/* Имя */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
						{isEditing ? (
							<>
								<input
									type="text"
									name="first_name"
									value={formData.first_name}
									onChange={handleInputChange}
									onKeyDown={blockInvalidNameKeys}
									onPaste={blockInvalidNamePaste}
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
								/>
								{errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
							</>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.first_name || 'Не указано'}
							</div>
						)}
					</div>

					{/* Фамилия */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
						{isEditing ? (
							<>
								<input
									type="text"
									name="last_name"
									value={formData.last_name}
									onChange={handleInputChange}
									onKeyDown={blockInvalidNameKeys}
									onPaste={blockInvalidNamePaste}
									className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
								/>
								{errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
							</>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.last_name || 'Не указано'}
							</div>
						)}
					</div>

					{/* Регион */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Регион</label>
						{isEditing ? (
							<select
								name="region_id"
								value={formData.region_id}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="">Выберите регион</option>
								{regions.map(region => (
									<option key={region.id} value={region.id}>{region.name}</option>
								))}
							</select>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{regions.find(r => r.id.toString() === formData.region_id)?.name || 'Не указано'}
							</div>
						)}
					</div>

					{/* Район */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Район</label>
						{isEditing ? (
							<select
								name="district_id"
								value={formData.district_id}
								onChange={handleInputChange}
								disabled={loadingDistricts || !formData.region_id}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
							>
								<option value="">
									{loadingDistricts
										? 'Загрузка...'
										: !formData.region_id
											? 'Сначала выберите регион'
											: 'Выберите район'}
								</option>
								{districts.map(district => (
									<option key={district.id} value={district.id}>{district.name}</option>
								))}
							</select>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{districts.find(d => d.id.toString() === formData.district_id)?.name || 'Не указано'}
							</div>
						)}
					</div>

					{/* Компания */}
					{(formData.account_type === 'company' || formData.account_type === 'joint') && (
						<>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Название компании</label>
								{isEditing ? (
									<input
										type="text"
										name="company_name"
										value={formData.company_name}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								) : (
									<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
										{formData.company_name || 'Не указано'}
									</div>
								)}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">ИНН компании</label>
								{isEditing ? (
									<input
										type="text"
										name="company_inn"
										value={formData.company_inn}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								) : (
									<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
										{formData.company_inn || 'Не указано'}
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PersonalInfoTab;