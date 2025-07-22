import React from 'react';
import { Edit3, Save, X, Upload } from "lucide-react";
import { DocumentsTabProps } from '../types';
import AvatarUpload from './AvatarUpload';

const DocumentsTab: React.FC<DocumentsTabProps> = ({
	formData,
	isEditing,
	saving,
	uploadingAvatar,
	fileInputRef,
	accountTypes,
	onInputChange,
	onSave,
	onCancel,
	onEdit,
	onAvatarFileChange,
	onRemoveAvatar,
	getInitials
}) => {
	return (
		<div>
			<div className="px-6 py-4 border-b flex items-center justify-between">
				<h2 className="text-xl font-semibold text-gray-900">Документы</h2>
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
					{/* Avatar Upload Section */}
					<AvatarUpload
						avatar={formData.avatar}
						isEditing={isEditing}
						uploadingAvatar={uploadingAvatar}
						fileInputRef={fileInputRef}
						onAvatarFileChange={onAvatarFileChange}
						onRemoveAvatar={onRemoveAvatar}
						getInitials={getInitials}
						inputId="avatar-upload-documents"
						showInDocuments={true}
					/>

					{/* Account Type */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Тип аккаунта</label>
						{isEditing ? (
							<select
								name="account_type"
								value={formData.account_type}
								onChange={onInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								{accountTypes.map(type => (
									<option key={type.value} value={type.value}>{type.label}</option>
								))}
							</select>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{accountTypes.find(t => t.value === formData.account_type)?.label || 'Не указано'}
							</div>
						)}
					</div>

					{/* Birth Date */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Дата рождения</label>
						{isEditing ? (
							<input
								type="date"
								name="birth_date"
								value={formData.birth_date}
								onChange={onInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.birth_date
									? new Date(formData.birth_date).toLocaleDateString('ru-RU')
									: 'Не указано'
								}
							</div>
						)}
					</div>

					{/* PINFL */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">ПИНФЛ</label>
						{isEditing ? (
							<input
								type="text"
								name="pinfl"
								value={formData.pinfl}
								onChange={onInputChange}
								maxLength={14}
								placeholder="14-значный ПИНФЛ"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.pinfl || 'Не указано'}
							</div>
						)}
					</div>

					{/* Passport */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Серия и номер паспорта</label>
						{isEditing ? (
							<input
								type="text"
								name="passport"
								value={formData.passport}
								onChange={onInputChange}
								placeholder="AA1234567"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						) : (
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{formData.passport || 'Не указано'}
							</div>
						)}
					</div>

					{/* Company INN - only show for company/joint accounts */}
					{(formData.account_type === 'company' || formData.account_type === 'joint') && (
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">ИНН компании</label>
							{isEditing ? (
								<input
									type="text"
									name="company_inn"
									value={formData.company_inn}
									onChange={onInputChange}
									placeholder="9-значный ИНН"
									maxLength={9}
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

				{/* Document Upload Section (if needed) */}
				{isEditing && (
					<div className="mt-8 pt-6 border-t">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Загрузка документов</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
								<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
								<p className="text-sm text-gray-600">Скан паспорта</p>
								<p className="text-xs text-gray-400 mt-1">PNG, JPG до 5MB</p>
							</div>
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
								<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
								<p className="text-sm text-gray-600">Справка о ПИНФЛ</p>
								<p className="text-xs text-gray-400 mt-1">PNG, JPG до 5MB</p>
							</div>
							{(formData.account_type === 'company' || formData.account_type === 'joint') && (
								<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
									<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
									<p className="text-sm text-gray-600">Справка о компании</p>
									<p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF до 5MB</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DocumentsTab;

