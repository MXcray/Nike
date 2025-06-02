import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import '@/app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/app/providers/StoreProvider';
import { StoreProvider } from '@/app/providers/StoreProvider/ui/StoreProvider.tsx';

const container = document.getElementById('root');

if (!container) {
	throw new Error('Контейнер root не найден.');
}

const root = createRoot(container);

root.render(
	<BrowserRouter>
			<StoreProvider>
				<App />
			</StoreProvider>
	</BrowserRouter>
);
