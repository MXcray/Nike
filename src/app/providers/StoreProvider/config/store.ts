import { configureStore } from '@reduxjs/toolkit';
import { UIReducer } from '../../../../features/UI/model/slices/UISlice';

export const store = configureStore({
	reducer: {
		ui: UIReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;