import { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema.ts';

export const getIsHeaderMenuOpened = (state: StateSchema) => state.ui.isMenuOpen;