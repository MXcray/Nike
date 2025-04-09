import { Suspense, useEffect } from 'react';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { AppRouter } from '@/app/providers/router';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { initFavorites } from '@/entities/Favorites';
import { getUserInited, initAuthData } from '@/entities/User';

const App = () => {
	const dispatch = useAppDispatch();
	const isInited = useSelector(getUserInited);

	useEffect(() => {
		if (!isInited) {
			dispatch(initAuthData());
		}
	}, [dispatch, isInited]);

	useEffect(() => {
		dispatch(initFavorites());
	}, [dispatch]);

	if (!isInited) {
		return (
			<div>Загрузка...</div>
		)
	}

	return (
		<div id={'app'} className="app" style={{ overflowX: 'hidden' }}>
			<Suspense fallback={'Загрузка...'}>
				<MainLayout
					header={<Header />}
					content={<AppRouter />}
					footer={<Footer />}
				/>
			</Suspense>
		</div>
	);
};

export default App;
