import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginByCredentials, registerByEmail } from '@/entities/User';
import { AppDispatch } from '@/app/providers/StoreProvider';

interface AuthByEmailProps {
    className?: string;
}

export const AuthByEmail = ({ className }: AuthByEmailProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const onLoginClick = useCallback(async () => {
        try {
            await dispatch(loginByCredentials({ username, password }));
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, username, password]);

    const onRegisterClick = useCallback(async () => {
        try {
            await dispatch(registerByEmail({ email, password, login, name }));
        } catch (e) {
            console.error(e);
        }
    }, [dispatch, email, password, login, name]);

    return (
        <div className={className}>
            {isLogin ? (
                <>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Email или Логин"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                    />
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Логин"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                    />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя"
                    />
                </>
            )}
            <button onClick={isLogin ? onLoginClick : onRegisterClick}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Перейти к регистрации' : 'Перейти к входу'}
            </button>
        </div>
    );
}; 