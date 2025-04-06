import { ProductsPageSchema } from '@/pages/ProductsPage/model/types/productsPageSchema.ts';
import { UISchema } from '@/features/UI';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';
import { UserSchema } from '@/entities/User';

export interface StateSchema {
	user: UserSchema,
	ui: UISchema;
	productsPage: ProductsPageSchema;
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