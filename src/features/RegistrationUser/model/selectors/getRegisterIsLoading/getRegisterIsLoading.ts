import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const getRegisterIsLoading = (state: StateSchema) => state.register.isLoading;