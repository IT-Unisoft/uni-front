import React from 'react';
import { User, FileText } from "lucide-react";
import { ProfileSidebarProps } from '../types';
import AvatarUpload from './AvatarUpload';

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
	formData,
	activeTab,
	setActiveTab,
	isEditing,
	uploadingAvatar,
	fileInputRef,
	onAvatarFileChange,
	getInitials,
	getRoleDisplayName,
	getRoleColor
}) => {
	return (
		<div className="lg:w-72 flex-shrink-0">
			<div className="bg-white rounded-xl shadow-sm border overflow-hidden">
				<div className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
					<AvatarUpload
						avatar={formData.avatar}
						isEditing={isEditing}
						uploadingAvatar={uploadingAvatar}
						fileInputRef={fileInputRef}
						onAvatarFileChange={onAvatarFileChange}
						onRemoveAvatar={() => {}}
						getInitials={getInitials}
						inputId="avatar-upload"
					/>
					<h3 className="mt-3 text-lg font-semibold text-gray-900">
						{formData.first_name && formData.last_name
							? `${formData.first_name} ${formData.last_name}`
							: 'Не указано'
						}
					</h3>
					<p className="text-sm text-gray-600">{formData.email || 'Не указано'}</p>

					{/* User Role Badge */}
					<div className="mt-2">
						<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(formData.role)}`}>
							{getRoleDisplayName(formData.role)}
						</span>
					</div>
				</div>

				{/* Navigation */}
				<nav className="p-2">
					<button
						onClick={() => setActiveTab('about')}
						className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === 'about'
							? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
							: 'text-gray-700 hover:bg-gray-50'
							}`}
					>
						<User className="w-5 h-5 mr-3" />
						About me
					</button>
					<button
						onClick={() => setActiveTab('documents')}
						className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === 'documents'
							? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
							: 'text-gray-700 hover:bg-gray-50'
							}`}
					>
						<FileText className="w-5 h-5 mr-3" />
						Documents
					</button>
				</nav>
			</div>
		</div>
	);
};

export default ProfileSidebar;

