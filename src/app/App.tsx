import { Suspense } from 'react';
import { MainLayout } from '../shared/layouts/MainLayout';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';
import { AppRouter } from './providers/router';

const App = () => {
	return (
		<div id={'app'} className="app" style={{ overflow: 'hidden' }}>
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
