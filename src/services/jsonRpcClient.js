import api from './api';

export async function callJsonRpc(method, params = {}) {
	try {
		const response = await api.post('/', {
			jsonrpc: '2.0',
			method,
			params,
			id: Date.now(),
		});

		const data = response.data;

		if (data.error) {
			console.error(`Ошибка от сервера (${method}):`, data.error);
			throw new Error(data.error.message);
		}

		return data.result;
	} catch (error) {
		console.error(`Ошибка сети или запроса (${method}):`, error.message);
		throw error;
	}
}
