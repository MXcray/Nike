import { AnyAction, configureStore, EnhancedStore, ReducersMapObject, ThunkDispatch } from '@reduxjs/toolkit';
import { UIReducer } from '@/features/UI/model/slices/UISlice';
import { productsPageReducer } from '@/pages/ProductsPage';
import { StateSchema, ThunkExtraArg } from './StateSchema.ts';
import { api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi.ts';
import { userReducer } from '@/entities/User';
import { registerReducer } from '@/features/RegistrationUser';
import { favoriteReducer } from '@/entities/Favorites';

export function createReduxStore(initialState?: StateSchema) {
	const rootReducer: ReducersMapObject<StateSchema> = {
		user: userReducer,
		ui: UIReducer,
		productsPage: productsPageReducer,
		favoriteProducts: favoriteReducer,
		// login: loginReducer,
		register: registerReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	}

	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: { api } as ThunkExtraArg
				}
			}).concat(rtkApi.middleware),
	})

	return store;
}


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<StateSchema, ThunkExtraArg, AnyAction>;
