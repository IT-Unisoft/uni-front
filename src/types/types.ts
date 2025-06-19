export interface LoginFormData {
	phoneNumber: string;
}


export interface LoginPageProps {
	onNavigateBack?: () => void;
	onLoginSuccess?: (data: LoginFormData) => void;
}

export interface NavbarProps {
	className?: string;
	onUserButtonClick?: () => void;
}

export interface LoginState {
	phoneNumber: string;
	isLoading: boolean;
	errors: {
		phoneNumber?: string;
	};
}