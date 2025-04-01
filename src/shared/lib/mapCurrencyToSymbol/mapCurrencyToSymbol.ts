import { Currency } from '@/shared/types/currency.ts';

export const mapCurrencyToSymbol: Record<Currency, string> = {
	[Currency.RUB]: '₽',
	[Currency.USD]: '$',
	[Currency.EUR]: '€',

}