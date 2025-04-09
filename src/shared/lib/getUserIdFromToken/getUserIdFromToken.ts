// Функция для безопасного получения ID пользователя из токена
export const getUserIdFromToken = (): string | null => {
	try {
		const token = localStorage.getItem('token');
		if (!token) return null;

		const tokenData = JSON.parse(atob(token.split('.')[1]));
		return tokenData.sub || null;
	} catch (error) {
		console.error('Ошибка при декодировании токена:', error);
		return null;
	}
};
