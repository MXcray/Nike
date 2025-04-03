// Import required modules
// eslint-disable-next-line @typescript-eslint/no-require-imports
const jsonServer = require('json-server');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// Create json-server instance
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
	static: path.join(__dirname, 'public') // Explicitly set the path to the public directory
});

// Set delay time in milliseconds (e.g., 1000ms = 1 second)
const DELAY_TIME = 800;

// Add custom delay middleware
server.use((req, res, next) => {
	setTimeout(next, DELAY_TIME);
});

// Use default middlewares (cors, static, etc.)
server.use(middlewares);

// Use router
server.use(router);

// Start server
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`JSON Server is running on port ${PORT}`);
	console.log(`All requests are delayed by ${DELAY_TIME}ms`);
	console.log(`Static files are served from: ${path.join(__dirname, 'public')}`);
});