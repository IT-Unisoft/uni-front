import React from 'react';
import { Edit3, Save, X } from "lucide-react";
import { PersonalInfoTabProps } from '../types';

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
	return (
		<div>
			<div className="px-6 py-4 border-b flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900">Личная информация</h2>
				<div className="flex gap-2">
					{isEditing ? (
						<>
							<button
								onClick={onSave}
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
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
						{isEditing ? (
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={onInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.email || 'Не указано'}
							</div>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
						{isEditing ? (
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={onInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.phone || 'Не указано'}
							</div>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
						{isEditing ? (
							<input
								type="text"
								name="first_name"
								value={formData.first_name}
								onChange={onInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.first_name || 'Не указано'}
							</div>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
						{isEditing ? (
							<input
								type="text"
								name="last_name"
								value={formData.last_name}
								onChange={onInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.last_name || 'Не указано'}
							</div>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Регион</label>
						{isEditing ? (
							<select
								name="region_id"
								value={formData.region_id}
								onChange={onInputChange}
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
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Район</label>
						{isEditing ? (
							<select
								name="district_id"
								value={formData.district_id}
								onChange={onInputChange}
								disabled={loadingDistricts || !formData.region_id}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
							>
								<option value="">
									{loadingDistricts
										? 'Загрузка...'
										: !formData.region_id
											? 'Сначала выберите регион'
											: 'Выберите район'
									}
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
					{(formData.account_type === 'company' || formData.account_type === 'joint') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Название компании</label>
							{isEditing ? (
								<input
									type="text"
									name="company_name"
									value={formData.company_name}
									onChange={onInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							) : (
								<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
									{formData.company_name || 'Не указано'}
								</div>
							)}
						</div>
					)}
					{(formData.account_type === 'company' || formData.account_type === 'joint') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">ИНН компании</label>
							{isEditing ? (
								<input
									type="text"
									name="company_inn"
									value={formData.company_inn}
									onChange={onInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							) : (
								<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
									{formData.company_inn || 'Не указано'}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PersonalInfoTab;

