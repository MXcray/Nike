import type { Meta, StoryObj } from '@storybook/react-vite';
import { FavoritesPage } from './FavoritesPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator.tsx';
import { mswDecorator } from 'msw-storybook-addon';
import { handlers } from '@/shared/api/msw/mswProducts/mswProducts.ts';
import { http } from 'msw';

const meta = {
	title: 'Pages/FavoritesPage',
	component: FavoritesPage,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof FavoritesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoFavoriteItem: Story = {
	args: {},
};

export const WithFavoriteItems: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			favoriteProducts: {
				data: {
					id: '1',
					productId: ['1', '2', '3'],
					userId: '1',
				},
				isLoading: false,
				error: undefined,
			}
		})
	]
};

export const WithFavoriteItemsLoading: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			favoriteProducts: {
				data: {
					id: '1',
					productId: ['1', '2', '3'],
					userId: '1',
				},
				isLoading: false,
				error: undefined,
			}
		}),
	],
	parameters: {
		msw: {
			handlers: [
				http.get('*/products', async () => {
					console.log('MSW: Перехвачен запрос товаров - бесконечная загрузка');
					return new Promise(() => {});
				})
			]
		}
	}
};

// для Docs применяется msw хендлер из последнего сториса, работает не корректно, разрабы не будут переделывать