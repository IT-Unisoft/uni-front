export interface District {
	id: number;
	name: string;
}

export interface Region {
	id: number;
	name: string;
	districts: District[];
}

export interface FormData {
	email: string;
	phone: string;
	first_name: string;
	last_name: string;
	birth_date: string;
	pinfl: string;
	avatar: string;
	passport: string;
	region_id: string;
	district_id: string;
	account_type: string;
	company_name: string;
	company_inn: string;
	role: string;
}

export interface AccountType {
	value: string;
	label: string;
}

export interface ProfileSidebarProps {
	formData: FormData;
	activeTab: string;
	setActiveTab: (tab: string) => void;
	isEditing: boolean;
	uploadingAvatar: boolean;
	fileInputRef: React.RefObject<HTMLInputElement>;
	onAvatarFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	getInitials: () => string;
	getRoleDisplayName: (role: string) => string;
	getRoleColor: (role: string) => string;
}

export interface PersonalInfoTabProps {
	formData: FormData;
	isEditing: boolean;
	saving: boolean;
	regions: Region[];
	districts: District[];
	loadingDistricts: boolean;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	onSave: () => void;
	onCancel: () => void;
	onEdit: () => void;
}

export interface DocumentsTabProps {
	formData: FormData;
	isEditing: boolean;
	saving: boolean;
	uploadingAvatar: boolean;
	fileInputRef: React.RefObject<HTMLInputElement>;
	accountTypes: AccountType[];
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	onSave: () => void;
	onCancel: () => void;
	onEdit: () => void;
	onAvatarFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveAvatar: () => void;
	getInitials: () => string;
}

export interface AvatarUploadProps {
	avatar: string;
	isEditing: boolean;
	uploadingAvatar: boolean;
	fileInputRef: React.RefObject<HTMLInputElement>;
	onAvatarFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveAvatar: () => void;
	getInitials: () => string;
	inputId?: string;
	showInDocuments?: boolean;
}

export interface LoadingSpinnerProps {
	onUserButtonClick: () => void;
}

export interface ErrorDisplayProps {
	error: string;
	onUserButtonClick: () => void;
}

