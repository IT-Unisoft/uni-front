import { callJsonRpc } from "./jsonRpcClient";

export async function sendOtp(contact) {
	try {
		const result = await callJsonRpc('auth.send', {
			contact,
			via: 'telegram'
		});
		console.log('Код отправлен:', result);
		return result;
	} catch (error) {
		console.error('Ошибка при отправке кода:', error.message);
		throw error;
	}
}

export async function verifyOtp(contact, otp) {
	try {
		const result = await callJsonRpc('auth.verify', {
			contact,
			otp
		});
		console.log('Успешная верификация:', result);
		return result;
	} catch (error) {
		console.error('Ошибка при верификации:', error.message);
		throw error;
	}
}

export async function getLocation() {
	try {
		const result = await callJsonRpc('location.get');
		console.log('Локация получена:', result);
		return result;
	} catch (error) {
		console.error('Ошибка при получении локации:', error.message);
		throw error;
	}
}

export async function completeProfile(formData) {
	try {
		const result = await callJsonRpc('profile.complete', {
			email: formData.email,
			phone: formData.phone,
			first_name: formData.first_name,
			last_name: formData.last_name,
			birth_date: formData.birth_date,
			region_id: formData.region_id,
			district_id: formData.district_id
		});
		console.log('Профиль успешно обновлён:', result);
		return result;
	} catch (error) {
		console.error('Ошибка при обновлении профиля:', error.message);
		throw error;
	}
}

export async function getProfile() {
	try {
		const result = await callJsonRpc('profile.get');
		console.log('Профиль получен:', result);
		return result;
	} catch (error) {
		console.error('Ошибка при получении профиля:', error.message);
		throw error;
	}
}

export async function updateProfile(data) {
	try {
		const result = await callJsonRpc('profile.update', data);
		return result;
	} catch (error) {
		console.error('Ошибка при обновлении профиля:', error.message);
		throw error;
	}
}

export async function switchRole(role) {
	try {
		const result = await callJsonRpc('profile.switch', { role });
		console.log('Роль успешно переключена:', result);
		return result;
	} catch (error) {
		console.error('Ошибка при смене роли:', error.message);
		throw error;
	}
}


export async function logOut() {
	try {
		const result = await callJsonRpc('profile.logout');
		return result;
	} catch (error) {
		console.error('Ошибка:', error.message);
		throw error;
	}
}