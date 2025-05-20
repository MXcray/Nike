
// Import required modules
// eslint-disable-next-line @typescript-eslint/no-require-imports
const jsonServer = require('json-server');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const auth = require('json-server-auth');
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
// const DELAY_TIME = 0;
// Add custom delay middleware
server.use((req, res, next) => {
	setTimeout(next, DELAY_TIME);
});

// Set up authentication rules (before the router)
// /auth/register, /auth/login routes will be automatically added
server.db = router.db;
server.use(auth.rewriter({
	// users: 600,
	products: 644
}));

// Настройка CORS для разрешения доступа к заголовку X-Total-Count
server.use((req, res, next) => {
	res.header('Access-Control-Expose-Headers', 'X-Total-Count');
	next();
});

// Custom middleware for handling nested property filtering
server.use((req, res, next) => {
	// Only apply to GET requests to /products
	if (req.method === 'GET' && req.path === '/products') {
		const { query } = req._parsedUrl;

		// If there are no query parameters, continue
		if (!query) {
			return next();
		}

		// Parse query parameters
		const queryParams = {};
		query.split('&').forEach(param => {
			const [key, value] = param.split('=');
			if (key && value) {
				queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
			}
		});

		// Get all products from the database
		let products = router.db.get('products').value();

		// Filter by price range if specified
		if (queryParams['price.currentPrice_gte']) {
			const minPrice = parseFloat(queryParams['price.currentPrice_gte']);
			products = products.filter(product =>
				product.price && product.price.currentPrice >= minPrice
			);
		}

		if (queryParams['price.currentPrice_lte']) {
			const maxPrice = parseFloat(queryParams['price.currentPrice_lte']);
			products = products.filter(product =>
				product.price && product.price.currentPrice <= maxPrice
			);
		}

		// Filter by size
		if (queryParams['size']) {
			const size = queryParams['size'];
			products = products.filter(product => {
				// Check if any variant has the requested size
				return product.variants && product.variants.some(variant =>
						variant.availableSizes && variant.availableSizes.some(sizeObj =>
							sizeObj.eu === size && sizeObj.inStock
						)
				);
			});
		}

		// Filter by color
		if (queryParams['color']) {
			const color = queryParams['color'];
			products = products.filter(product => {
				// Check if any variant has the requested color
				return product.variants && product.variants.some(variant =>
					// variant.color.toLowerCase() === color.toLowerCase()
					variant.color === color
				);
			});
		}

		// Filter by material
		if (queryParams['material']) {
			const material = queryParams['material'];
			products = products.filter(product => {
				// Check if product specifications include the requested material
				return product.specifications &&
					product.specifications.material &&
					product.specifications.material.some(mat =>
						mat.toLowerCase().includes(material.toLowerCase())
					);
			});
		}

		// Handle pagination
		const page = parseInt(queryParams['_page']) || 1;
		const limit = parseInt(queryParams['_limit']) || products.length;
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		// Set X-Total-Count header for pagination
		res.header('X-Total-Count', products.length.toString());

		// Return paginated results
		const paginatedProducts = products.slice(startIndex, endIndex);

		// Send the filtered and paginated response
		res.json(paginatedProducts);
		return;
	}

	next();
});

// Use default middlewares (cors, static, etc.)
server.use(middlewares);
// Use auth middleware
server.use(auth);
// Use router
server.use(router);
// Start server
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`JSON Server is running on port ${PORT}`);
	console.log(`All requests are delayed by ${DELAY_TIME}ms`);
	console.log(`Static files are served from: ${path.join(__dirname, 'public')}`);
});
