// Function to convert file to base64
export const convertFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result);
			} else {
				reject('Ошибка при чтении файла');
			}
		};
		reader.onerror = (error) => reject(error);
	});
};

// Function to get initials
export const getInitials = (firstName: string, lastName: string): string => {
	return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

