import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { LoginUserRequest, useLoginUserMutation } from '../model/api/LoginApi';
import { useCallback } from 'react';
import { userActions } from '@/entities/User';

export const useLogin = () => {
	const [loginUser, result] = useLoginUserMutation();
	const dispatch = useAppDispatch();

	const login = useCallback(async (credentials: LoginUserRequest) => {
		const response = await loginUser(credentials).unwrap();
		dispatch(userActions.setAuthData(response));
		return response;
	}, [loginUser, dispatch]);

	return [
		login,
		{ ...result }
	] as const;
};