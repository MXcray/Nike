import { RootState } from '../../../../app/providers/StoreProvider/config/store.ts';

export const getIsHeaderMenuOpened = (state: RootState) => state.ui.isMenuOpen;