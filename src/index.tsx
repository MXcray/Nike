import { createRoot } from 'react-dom/client';
import App from './app/App';
import './app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (!container) {
	throw new Error('Контейнер root не найден.');
}

const root = createRoot(container);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
