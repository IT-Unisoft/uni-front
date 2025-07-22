// Function to get Russian name of role
export const getRoleDisplayName = (role: string): string => {
	const roleNames: { [key: string]: string } = {
		"guest": "Гость",
		"user": "Пользователь",
		"admin": "Администратор",
		"moderator": "Модератор",
		"premium": "Премиум пользователь",
		"verified": "Верифицированный пользователь"
	};
	return roleNames[role] || role;
};

// Function to get the color of a role
export const getRoleColor = (role: string): string => {
	const roleColors: { [key: string]: string } = {
		"guest": "bg-gray-100 text-gray-800",
		"host": "bg-red-100 text-red-800"
	};
	return roleColors[role] || "bg-gray-100 text-gray-800";
};

