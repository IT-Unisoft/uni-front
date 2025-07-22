import React from 'react';
import { Camera, Upload, X } from "lucide-react";
import { AvatarUploadProps } from '../types';

const AvatarUpload: React.FC<AvatarUploadProps> = ({
	avatar,
	isEditing,
	uploadingAvatar,
	fileInputRef,
	onAvatarFileChange,
	onRemoveAvatar,
	getInitials,
	inputId = "avatar-upload",
	showInDocuments = false
}) => {
	if (showInDocuments) {
		return (
			<div className="md:col-span-2">
				<label className="block text-sm font-medium text-gray-700 mb-2">Фото профиля</label>
				{isEditing ? (
					<div className="space-y-4">
						{/* Current Avatar Display */}
						<div className="flex items-center gap-4">
							{avatar ? (
								<img
									src={avatar}
									alt="Avatar"
									className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
								/>
							) : (
								<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
									{getInitials()}
								</div>
							)}

							{/* Avatar Controls */}
							<div className="flex gap-2">
								<input
									ref={fileInputRef}
									type="file"
									accept="image/png,image/jpg,image/jpeg"
									onChange={onAvatarFileChange}
									className="hidden"
									id={inputId}
								/>
								<label
									htmlFor={inputId}
									className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
								>
									{uploadingAvatar ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											Загрузка...
										</>
									) : (
										<>
											<Upload className="w-4 h-4 mr-2" />
											Загрузить
										</>
									)}
								</label>

								{avatar && (
									<button
										type="button"
										onClick={onRemoveAvatar}
										className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
									>
										<X className="w-4 h-4 mr-2" />
										Удалить
									</button>
								)}
							</div>
						</div>

						<p className="text-xs text-gray-500">Поддерживаются форматы: PNG, JPG, JPEG. Максимальный размер: 5MB</p>
					</div>
				) : (
					<div className="flex items-center gap-4">
						{avatar ? (
							<img
								src={avatar}
								alt="Avatar"
								className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
							/>
						) : (
							<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
								{getInitials()}
							</div>
						)}
						<div className="flex-1">
							<div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
								{avatar ? 'Изображение загружено' : 'Изображение не загружено'}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}

	// Sidebar avatar version
	return (
		<div className="relative inline-block">
			{avatar ? (
				<img
					src={avatar}
					alt="Avatar"
					className="w-20 h-20 rounded-full object-cover shadow-lg"
				/>
			) : (
				<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
					{getInitials()}
				</div>
			)}
			{isEditing && (
				<div className="absolute -bottom-2 -right-2">
					<input
						ref={fileInputRef}
						type="file"
						accept="image/png,image/jpg,image/jpeg"
						onChange={onAvatarFileChange}
						className="hidden"
						id={inputId}
					/>
					<label
						htmlFor={inputId}
						className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer block"
					>
						{uploadingAvatar ? (
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
						) : (
							<Camera className="w-4 h-4 text-gray-600" />
						)}
					</label>
				</div>
			)}
		</div>
	);
};

export default AvatarUpload;

