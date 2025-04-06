import { UserSchema } from './model/types/user';
import { userReducer, userActions } from './model/slices/userSlice';
import { loginByCredentials, registerByEmail, getUserProfile } from './api/userApi';

export type { UserSchema };
export {
	userReducer,
	userActions,
	loginByCredentials,
	registerByEmail,
	getUserProfile,
};