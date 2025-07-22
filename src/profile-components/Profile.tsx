import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";

// Components
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import ProfileSidebar from './components/ProfileSidebar';
import PersonalInfoTab from './components/PersonalInfoTab';
import DocumentsTab from './components/DocumentsTab';

// Hooks and utilities
import { useProfile } from './hooks/useProfile';
import { getRoleDisplayName, getRoleColor } from './utils/roleUtils';
import { getInitials } from './utils/fileUtils';

// Types
import { AccountType } from './types';

export default function Profile() {
	const navigate = useNavigate();
	
	const {
		activeTab,
		isEditing,
		loading,
		error,
		regions,
		districts,
		loadingDistricts,
		saving,
		uploadingAvatar,
		formData,
		fileInputRef,
		setActiveTab,
		handleInputChange,
		handleAvatarFileChange,
		handleRemoveAvatar,
		handleSave,
		handleCancel,
		handleEdit
	} = useProfile();

	const handleUserButtonClick = () => navigate('/login');

	const accountTypes: AccountType[] = [
		{ value: "individual", label: "Физическое лицо" },
		{ value: "company", label: "Компания" },
		{ value: "joint", label: "Совместное предприятие" }
	];

	const getInitialsFromFormData = () => {
		return getInitials(formData.first_name || '', formData.last_name || '');
	};

	if (loading) {
		return <LoadingSpinner onUserButtonClick={handleUserButtonClick} />;
	}

	if (error) {
		return <ErrorDisplay error={error} onUserButtonClick={handleUserButtonClick} />;
	}

	return (
		<>
			<div className="w-full bg-[#FFFFFF] container mx-auto px-10">
				<Navbar onUserButtonClick={handleUserButtonClick} />
			</div>
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col lg:flex-row gap-8">
						{/* Sidebar */}
						<ProfileSidebar
							formData={formData}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							isEditing={isEditing}
							uploadingAvatar={uploadingAvatar}
							fileInputRef={fileInputRef}
							onAvatarFileChange={handleAvatarFileChange}
							getInitials={getInitialsFromFormData}
							getRoleDisplayName={getRoleDisplayName}
							getRoleColor={getRoleColor}
						/>

						{/* Main Content */}
						<div className="flex-1">
							<div className="bg-white rounded-xl shadow-sm border">
								{activeTab === 'about' && (
									<PersonalInfoTab
										formData={formData}
										isEditing={isEditing}
										saving={saving}
										regions={regions}
										districts={districts}
										loadingDistricts={loadingDistricts}
										onInputChange={handleInputChange}
										onSave={handleSave}
										onCancel={handleCancel}
										onEdit={handleEdit}
									/>
								)}
								{activeTab === 'documents' && (
									<DocumentsTab
										formData={formData}
										isEditing={isEditing}
										saving={saving}
										uploadingAvatar={uploadingAvatar}
										fileInputRef={fileInputRef}
										accountTypes={accountTypes}
										onInputChange={handleInputChange}
										onSave={handleSave}
										onCancel={handleCancel}
										onEdit={handleEdit}
										onAvatarFileChange={handleAvatarFileChange}
										onRemoveAvatar={handleRemoveAvatar}
										getInitials={getInitialsFromFormData}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</>
	);
}

