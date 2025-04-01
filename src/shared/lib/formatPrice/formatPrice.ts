/**
 * Форматирует числовое значение цены, разделяя разряды пробелами
 * @param price - Числовое значение цены
 * @returns Отформатированная строка с ценой
 * @example
 * // Возвращает "5 243"
 * formatPrice(5243);
 *
 * // Возвращает "1 234 567"
 * formatPrice(1234567);
 */
export function formatPrice(price: number | string): string {
	// Преобразуем входное значение в строку, если оно уже не строка
	const priceString = typeof price === 'number' ? price.toString() : price;

	// Разделяем число на целую и дробную части (если есть)
	const [integerPart, decimalPart] = priceString.split('.');

	// Форматируем целую часть, добавляя пробелы между разрядами
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

	// Возвращаем отформатированное число, добавляя дробную часть, если она есть
	return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}