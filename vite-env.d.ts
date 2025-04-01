/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_MODE: string;
	// Добавьте здесь другие переменные окружения, которые вы используете
	// readonly VITE_API_URL: string;
	// readonly VITE_DEBUG: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}