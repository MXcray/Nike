import { ProductsPageSchema } from '@/pages/ProductsPage/model/types/productsPageSchema.ts';
import { UISchema } from '@/features/UI';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';
import { UserSchema } from '@/entities/User';
// import { LoginSchema } from 'src/features/RegistrationUser';
import { RegisterSchema } from '@/features/RegistrationUser';
import { FavoriteProductSchema } from '@/entities/Favorites';

export interface StateSchema {
	user: UserSchema,
	ui: UISchema;
	productsPage: ProductsPageSchema;
	favoriteProducts: FavoriteProductSchema;
	// login: LoginSchema;
	register: RegisterSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}