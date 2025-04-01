import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Получаем аналог __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Конфигурация генератора
const config = {
	numberOfProducts: 5, // Количество продуктов для генерации
	outputPath: join(__dirname, '../json-server/db.json'),
	minImages: 3, // Минимальное количество изображений для продукта
	maxImages: 5, // Максимальное количество изображений для продукта
};

// Массив брендов для генерации
const brands = ['Nike'];

// Массив моделей для генерации
const models = [
	'Air Max', 'Air Force', 'Dunk', 'Cortez', 'Blazer', 'Air VaporMax',
	'Superstar', 'Stan Smith', 'Gazelle', 'Ultra Boost', 'NMD',
	'Suede', 'RS-X', 'Future Rider', 'Clyde',
	'Classic Leather', 'Club C', 'Workout Plus', 'Zig Kinetica',
	'574', '990', '997', '1080',
	'Gel-Lyte', 'Gel-Kayano', 'GT-2000',
	'Chuck Taylor', 'One Star', 'Pro Leather',
	'Old Skool', 'Authentic', 'Sk8-Hi', 'Era'
];

// Массив типов продуктов
const productTypes = ['sneakers', 'running', 'basketball', 'casual', 'training'];

// Массив цветов
const colors = [
	{ name: 'black', hex: '282828' },
	{ name: 'white', hex: 'ECF2F4' },
	{ name: 'red', hex: 'CF3D48' },
	{ name: 'blue', hex: '4296C3' },
	{ name: 'green', hex: '3A7D44' },
	{ name: 'yellow', hex: 'F9D923' },
	{ name: 'purple', hex: '6A0DAD' },
	{ name: 'orange', hex: 'FF7F50' },
	{ name: 'grey', hex: '808080' },
	{ name: 'pink', hex: 'FFC0CB' }
];

// Массив размеров
const sizes = [
	'36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5',
	'40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44', '44.5'
];

// Массив категорий
const categories = [
	['Обувь', 'Кроссовки', 'Спортивная обувь'],
	['Обувь', 'Кроссовки', 'Повседневная обувь'],
	['Обувь', 'Кроссовки', 'Баскетбольная обувь'],
	['Обувь', 'Кроссовки', 'Беговая обувь'],
	['Обувь', 'Кроссовки', 'Тренировочная обувь']
];

// Массив тегов
const tagsList = [
	['бег', 'спорт', 'амортизация', 'комфорт'],
	['стиль', 'повседневная', 'классика', 'мода'],
	['баскетбол', 'спорт', 'поддержка', 'высокие'],
	['тренировка', 'фитнес', 'легкие', 'дышащие'],
	['технологичные', 'инновации', 'премиум', 'дизайн']
];

// Массив коллекций
const collections = ['AirMax', 'Originals', 'Classics', 'Performance', 'Heritage', 'Signature', 'Lifestyle'];

// Массив материалов
const materials = [
	['кожа', 'Синтетика', 'текстиль', 'резина'],
	['замша', 'текстиль', 'резина', 'пена'],
	['кожа', 'замша', 'резина', 'EVA'],
	['текстиль', 'Синтетика', 'резина', 'пена'],
	['кожа', 'текстиль', 'резина', 'полиуретан']
];

// Массив бейджей
const badges = ['isNew', 'isBestseller', 'isDiscount', null];

// Массив стран производства
const countries = ['Вьетнам', 'Китай', 'Индия', 'Индонезия', 'Камбоджа', 'Бангладеш'];

// Функция для генерации случайного числа в диапазоне
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для генерации случайного элемента из массива
const getRandomElement = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};

// Функция для генерации случайного булевого значения с вероятностью
const getRandomBoolean = (probability = 0.5) => {
	return Math.random() < probability;
};

// Функция для генерации slug из имени продукта
const generateSlug = (name) => {
	return name
		.toLowerCase()
		.replace(/\s+/g, '_')
		// eslint-disable-next-line no-useless-escape
		.replace(/[^\w\-]+/g, '')
		// eslint-disable-next-line no-useless-escape
		.replace(/\-\-+/g, '_')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

// Функция для генерации размеров
const generateSizes = () => {
	const result = [];
	const selectedSizeIndex = getRandomInt(0, sizes.length - 1);

	for (let i = 0; i < sizes.length; i++) {
		result.push({
			eu: sizes[i],
			inStock: getRandomBoolean(0.8),
			quantity: getRandomInt(0, 20),
			...(i === selectedSizeIndex ? { isSelected: true } : {})
		});
	}

	return result;
};

// Функция для генерации вариантов продукта
const generateVariants = (productName) => {
	const result = [];
	const numVariants = getRandomInt(1, 4);
	const selectedVariantIndex = getRandomInt(0, numVariants - 1);
	const usedColors = new Set();

	for (let i = 0; i < numVariants; i++) {
		let color;
		do {
			color = getRandomElement(colors);
		} while (usedColors.has(color.name));

		usedColors.add(color.name);

		result.push({
			color: color.name,
			colorHex: color.hex,
			isSelected: i === selectedVariantIndex,
			images: [], // Изображения будут добавлены позже
			availableSizes: generateSizes()
		});
	}

	return result;
};

// Функция для генерации изображений продукта
const generateImages = (productName, count) => {
	const images = [];
	const slug = generateSlug(productName);

	// Первое изображение всегда main
	images.push({
		title: productName,
		src: `/img/${slug}_1.jpg`,
		type: "main"
	});

	// Остальные изображения - side
	for (let i = 1; i < count; i++) {
		// Чередуем обычные и reverse изображения
		const isReverse = i % 2 === 1;
		images.push({
			title: productName,
			src: `/img/${slug}${isReverse ? '-reverse' : ''}.jpg`,
			type: "side"
		});
	}

	return images;
};

// Функция для генерации цены
const generatePrice = () => {
	const currentPrice = getRandomInt(3000, 15000);
	const hasDiscount = getRandomBoolean(0.7);

	if (hasDiscount) {
		const discountPercentage = getRandomInt(10, 30);
		const oldPrice = Math.round(currentPrice / (1 - discountPercentage / 100));
		return {
			oldPrice,
			currentPrice,
			currency: "RUB"
		};
	}

	return {
		currentPrice,
		currency: "RUB"
	};
};

// Функция для генерации спецификаций
const generateSpecifications = () => {
	return {
		sex: getRandomBoolean(0.7) ? "Мужское" : "Женское",
		country: getRandomElement(countries),
		material: getRandomElement(materials),
		collection: getRandomElement(collections),
		warranty: "1 год",
		releaseYear: String(getRandomInt(2020, 2023))
	};
};

// Функция для генерации описания
const generateDescription = (name, brand, model) => {
	const baseDescription = `Кроссовки ${name} с поддерживающей амортизацией,
	 созданной для плавного бега,
	  представляет собой совершенно новый взгляд на знакомую коллекцию.`;

	return [
		baseDescription,
		`Модель ${model} названа в честь команды "${brand} Team".
		 Впервые модель появилась на площадках в ${getRandomInt(1970, 2010)} году.
		  Сейчас это уже классика lifestyle от ${brand}.`,
		"— натуральная кожа для верха кроссовок",
		"— укрепляющие вставки из натуральной замши",
		"— контрастный дизайн",
		"— прямая шнуровка",
		"— амортизирующая подошва"
	];
};

// Функция для генерации одного продукта
const generateProduct = (id) => {
	const brand = getRandomElement(brands);
	const model = getRandomElement(models);
	const name = `Кроссовки ${brand} ${model}`;
	const type = getRandomElement(productTypes);

	const imageCount = getRandomInt(config.minImages, config.maxImages);
	const images = generateImages(name, imageCount);

	const variants = generateVariants(name);

	return {
		id: String(id),
		type,
		name,
		brand,
		model,
		shortDescription: `${name} с поддерживающей амортизацией,
		 созданной для плавного бега,
		  представляет собой совершенно новый взгляд на знакомую коллекцию.`,
		description: generateDescription(name, brand, model),
		specifications: generateSpecifications(),
		variants,
		price: generatePrice(),
		images,
		isStock: getRandomBoolean(0.9),
		rating: parseFloat((getRandomInt(30, 50) / 10).toFixed(1)),
		reviewCount: getRandomInt(10, 500),
		badge: getRandomElement(badges),
		category: getRandomElement(categories),
		tags: getRandomElement(tagsList)
	};
};

// Функция для генерации всех продуктов
const generateProducts = () => {
	const products = [];

	for (let i = 1; i <= config.numberOfProducts; i++) {
		products.push(generateProduct(i));
	}

	return products;
};

// Функция для чтения существующего db.json
const readExistingDb = () => {
	try {
		const data = fs.readFileSync(config.outputPath, 'utf8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Ошибка при чтении файла db.json:', error);
		return { products: [] };
	}
};

// Функция для записи данных в db.json
const writeDbJson = (data) => {
	try {
		fs.writeFileSync(config.outputPath, JSON.stringify(data, null, 2), 'utf8');
		console.log(`Успешно сгенерировано ${config.numberOfProducts} продуктов в ${config.outputPath}`);
	} catch (error) {
		console.error('Ошибка при записи в файл db.json:', error);
	}
};

// Основная функция
const main = () => {
	// Читаем существующий db.json
	const db = readExistingDb();

	// Генерируем новые продукты
	const products = generateProducts();

	// Обновляем db.json
	db.products = products;

	// Записываем обновленный db.json
	writeDbJson(db);
};

// Запускаем скрипт
main();