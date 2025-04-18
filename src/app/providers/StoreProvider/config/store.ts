import { AnyAction, configureStore, EnhancedStore, ReducersMapObject, ThunkDispatch } from '@reduxjs/toolkit';
import { UIReducer } from '@/features/UI/model/slices/UISlice';
import { productsPageReducer } from '@/pages/ProductsPage';
import { StateSchema, ThunkExtraArg } from './StateSchema.ts';
import { api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi.ts';
import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthUser';
import { registerReducer } from '@/features/RegistrationUser';
import { favoriteReducer } from '@/entities/Favorites';

const rootReducer: ReducersMapObject<StateSchema> = {
	user: userReducer,
	ui: UIReducer,
	productsPage: productsPageReducer,
	favoriteProducts: favoriteReducer,
	login: loginReducer,
	register: registerReducer,
	[rtkApi.reducerPath]: rtkApi.reducer,
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: { api } as ThunkExtraArg
			}
		}).concat(rtkApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, AnyAction>;
