import { rtkApi } from '@/shared/api/rtkApi';
import { UserData } from '../model/types/user';
import { getUserIdFromToken } from '@/shared/lib/getUserIdFromToken/getUserIdFromToken.ts';

const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getUserDataByToken: build.query<UserData, void>({
			query: () => {
				const userId = getUserIdFromToken();
				if (!userId) {
					throw new Error('Токен не найден или недействителен');
				}

				return {
					url: `users/${userId}`,
					method: 'GET',
				};
			},
			providesTags: ['UserData'],
		}),
	}),
});

export const getUserDataByTokenQuery =
	userApi.endpoints.getUserDataByToken.initiate;
