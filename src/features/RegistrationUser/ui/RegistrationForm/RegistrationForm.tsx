import { memo, useCallback } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import cls from './RegistrationForm.module.scss';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch.ts';

interface RegistrationFormProps {
	className?: string;
}

export const RegistrationForm = memo((props: RegistrationFormProps) => {
	const {
		className,
	} = props;

	const dispatch = useAppDispatch();

	const onChangeLogin = useCallback(() => {

	}, []);

	const onChangePassword = useCallback(() => {

	}, []);

	// const onRegisterClick = useCallback( async() => {
	// 	const result = await dispatch()
	// })

	return (
			<div className={classNames(cls.RegistrationForm, {}, [className])}>
				<form onSubmit={() => console.log('submit')}>
					<input type="text" onChange={onChangeLogin} />
					<input type="text" onChange={onChangePassword} />
					<button type='submit'>submit</button>
				</form>
			</div>
	);
});