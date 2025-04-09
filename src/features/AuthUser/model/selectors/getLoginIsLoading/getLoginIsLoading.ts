import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const getLoginIsLoading = (state: StateSchema) => state.login.isLoading;