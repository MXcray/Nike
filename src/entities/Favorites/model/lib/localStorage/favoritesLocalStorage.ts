// Ключ для хранения избранных товаров в localStorage
export const FAVORITES_LOCALSTORAGE_KEY = 'favorites';

/**
 * Получает избранные товары из localStorage
 */
export function getLocalFavorites(): string[] {
	try {
		const favorites = localStorage.getItem(FAVORITES_LOCALSTORAGE_KEY);
		return favorites ? JSON.parse(favorites) : [];
	} catch (e) {
		console.error('Ошибка при чтении избранных товаров из localStorage:', e);
		return [];
	}
}

/**
 * Добавляет товар в избранное в localStorage
 */
export function addToLocalFavorites(productId: string): string[] {
	try {
		const favorites = getLocalFavorites();

		// Добавляем товар, если его еще нет в избранном
		if (!favorites.includes(productId)) {
			const updatedFavorites = [...favorites, productId];
			localStorage.setItem(FAVORITES_LOCALSTORAGE_KEY, JSON.stringify(updatedFavorites));
			console.log('Товар добавлен в избранное (localStorage)');
			return updatedFavorites;
		}

		console.log('Товар уже в избранном (localStorage)');
		return favorites;
	} catch (e) {
		console.error('Ошибка при добавлении товара в избранное (localStorage):', e);
		return [];
	}
}

/**
 * Удаляет товар из избранного в localStorage
 */
export function removeFromLocalFavorites(productId: string): string[] {
	try {
		const favorites = getLocalFavorites();
		const updatedFavorites = favorites.filter(id => id !== productId);

		localStorage.setItem(FAVORITES_LOCALSTORAGE_KEY, JSON.stringify(updatedFavorites));
		console.log('Товар удален из избранного (localStorage)');
		return updatedFavorites;
	} catch (e) {
		console.error('Ошибка при удалении товара из избранного (localStorage):', e);
		return [];
	}
}

/**
 * Очищает избранные товары в localStorage
 */
export function clearLocalFavorites(): void {
	try {
		localStorage.removeItem(FAVORITES_LOCALSTORAGE_KEY);
		console.log('Избранные товары в localStorage очищены');
	} catch (e) {
		console.error('Ошибка при очистке избранных товаров в localStorage:', e);
	}
}
