/* eslint-disable */

import { http, HttpResponse } from 'msw';

// Функция для получения изображений с json-server
const getJsonServerImage = (imagePath: string) => {
	return `http://localhost:3000${imagePath}`;
};

// Моковые данные товаров
const mockProducts = [
	{
		"id": "1",
		"type": "sneakers",
		"name": "Кроссовки Nike Air VaporMax 2023 Flyknit",
		"brand": "Nike",
		"model": "Air VaporMax 2023 Flyknit",
		"shortDescription": "Кроссовки Nike Air VaporMax 2023 Flyknit с поддерживающей амортизацией, созданной для плавного бега, представляет собой совершенно новый взгляд на знакомую коллекцию.",
		"description": [
			"Кроссовки Nike Air VaporMax 2023 Flyknit с поддерживающей амортизацией, созданной для плавного бега, представляет собой совершенно новый взгляд на знакомую коллекцию. ",
			"Модель VaporMax названа в честь команды \"Portland Trail Blazers\". Впервые модель появилась на площадках в 1972 году. Сейчас это уже классика lifestyle от Nike.",
			"— натуральная кожа для верха кроссовок",
			"— укрепляющие вставки из натуральной замши",
			"— контрастный swoosh",
			"— прямая шнуровка",
			"— прямая шнуровка"
		],
		"specifications": {
			"sex": "Мужское",
			"country": "Индия",
			"material": [
				"кожа",
				"Синтетика",
				"текстиль",
				"резина"
			],
			"collection": "AirMax",
			"warranty": "1 год",
			"releaseYear": "2023"
		},
		"variants": [
			{
				"color": "black",
				"colorHex": "282828",
				"isSelected": false,
				"images": [],
				"availableSizes": [
					{
						"eu": "36",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "36.5",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "37",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "40",
						"inStock": true,
						"quantity": 10,
						"isSelected": true
					},
					{
						"eu": "40.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "41",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "41.5",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "42",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "42.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "43",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "43.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "44.5",
						"inStock": true,
						"quantity": 10
					}
				]
			},
			{
				"color": "blue",
				"colorHex": "4296C3",
				"isSelected": false,
				"images": [],
				"availableSizes": [
					{
						"eu": "36",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "36.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "40",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "40.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "41",
						"inStock": true,
						"quantity": 10,
						"isSelected": true
					},
					{
						"eu": "41.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "42",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "42.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "43",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "43.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "44.5",
						"inStock": true,
						"quantity": 10
					}
				]
			},
			{
				"color": "red",
				"colorHex": "CF3D48",
				"isSelected": false,
				"images": [],
				"availableSizes": [
					{
						"eu": "36",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "36.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39.5",
						"inStock": true,
						"quantity": 10,
						"isSelected": true
					},
					{
						"eu": "40",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "40.5",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "41",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "41.5",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "42",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "42.5",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "43",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "43.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "44.5",
						"inStock": true,
						"quantity": 10
					}
				]
			},
			{
				"color": "white",
				"colorHex": "ECF2F4",
				"isSelected": true,
				"images": [],
				"availableSizes": [
					{
						"eu": "36",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "36.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "38.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "39.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "40",
						"inStock": true,
						"quantity": 10,
						"isSelected": true
					},
					{
						"eu": "40.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "41",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "41.5",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "42",
						"inStock": false,
						"quantity": 10
					},
					{
						"eu": "42.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "43",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "43.5",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "44.5",
						"inStock": true,
						"quantity": 10
					}
				]
			}
		],
		"price": {
			"oldPrice": 7999,
			"currentPrice": 6329,
			"currency": "RUB"
		},
		"images": [
			{
				"title": "Nike Air VaporMax 2023 Flyknit",
				"src": getJsonServerImage("/img/Nike_Air_VaporMax_2023_Flyknit_1.jpg"),
				"type": "main"
			},
			{
				"title": "Nike Air VaporMax 2023 Flyknit",
				"src": getJsonServerImage("/img/Nike_Air_VaporMax_2023_Flyknit_2.jpg"),
				"type": "side"
			},
			{
				"title": "Nike Air VaporMax 2023 Flyknit",
				"src": getJsonServerImage("/img/Nike_Air_VaporMax_2023_Flyknit_3.jpg"),
				"type": "side"
			},
			{
				"title": "Nike Air VaporMax 2023 Flyknit",
				"src": getJsonServerImage("/img/Nike_Air_VaporMax_2023_Flyknit_4.jpg"),
				"type": "side"
			},
			{
				"title": "Nike Air VaporMax 2023 Flyknit",
				"src": getJsonServerImage("/img/Nike_Air_VaporMax_2023_Flyknit_5.jpg"),
				"type": "side"
			}
		],
		"isStock": true,
		"rating": 4.8,
		"reviewCount": 428,
		"badge": "isDiscount",
		"discount": "20",
		"category": [
			"Обувь",
			"Кроссовки",
			"Спортивная обувь"
		],
		"tags": [
			"бег",
			"спорт",
			"амортизация",
			"flyknit"
		]
	},
	{
		"id": "2",
		"type": "sneakers",
		"name": "Кроссовки Nike NMD",
		"brand": "Nike",
		"model": "NMD",
		"shortDescription": "Кроссовки Nike NMD с поддерживающей амортизацией,\n\t\t созданной для плавного бега,\n\t\t  представляет собой совершенно новый взгляд на знакомую коллекцию.",
		"description": [
			"Кроссовки Кроссовки Nike NMD с поддерживающей амортизацией,\n\t созданной для плавного бега,\n\t  представляет собой совершенно новый взгляд на знакомую коллекцию.",
			"Модель NMD названа в честь команды \"Nike Team\".\n\t\t Впервые модель появилась на площадках в 1986 году.\n\t\t  Сейчас это уже классика lifestyle от Nike.",
			"— натуральная кожа для верха кроссовок",
			"— укрепляющие вставки из натуральной замши",
			"— контрастный дизайн",
			"— прямая шнуровка",
			"— амортизирующая подошва"
		],
		"specifications": {
			"sex": "Мужское",
			"country": "Китай",
			"material": [
				"замша",
				"текстиль",
				"резина",
				"пена"
			],
			"collection": "Signature",
			"warranty": "1 год",
			"releaseYear": "2021"
		},
		"variants": [
			{
				"color": "green",
				"colorHex": "3A7D44",
				"isSelected": true,
				"images": [],
				"availableSizes": [
					{
						"eu": "36",
						"inStock": true,
						"quantity": 12
					},
					{
						"eu": "36.5",
						"inStock": true,
						"quantity": 0
					},
					{
						"eu": "37",
						"inStock": true,
						"quantity": 7
					},
					{
						"eu": "37.5",
						"inStock": false,
						"quantity": 0
					},
					{
						"eu": "38",
						"inStock": true,
						"quantity": 4
					},
					{
						"eu": "38.5",
						"inStock": true,
						"quantity": 12
					},
					{
						"eu": "39",
						"inStock": true,
						"quantity": 6
					},
					{
						"eu": "39.5",
						"inStock": true,
						"quantity": 12
					},
					{
						"eu": "40",
						"inStock": true,
						"quantity": 3,
						"isSelected": true
					},
					{
						"eu": "40.5",
						"inStock": true,
						"quantity": 13
					},
					{
						"eu": "41",
						"inStock": false,
						"quantity": 12
					},
					{
						"eu": "41.5",
						"inStock": true,
						"quantity": 2
					},
					{
						"eu": "42",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "42.5",
						"inStock": true,
						"quantity": 0
					},
					{
						"eu": "43",
						"inStock": false,
						"quantity": 8
					},
					{
						"eu": "43.5",
						"inStock": false,
						"quantity": 1
					},
					{
						"eu": "44",
						"inStock": false,
						"quantity": 6
					},
					{
						"eu": "44.5",
						"inStock": true,
						"quantity": 18
					}
				]
			}
		],
		"price": {
			"oldPrice": 12557,
			"currentPrice": 10548,
			"currency": "RUB",
			"discountPercentage": 16
		},
		"images": [
			{
				"title": "Кроссовки Nike NMD",
				"src": getJsonServerImage("/img/7.jpg"),
				"type": "main"
			},
			{
				"title": "Кроссовки Nike NMD",
				"src": getJsonServerImage("/img/7-reverse.jpg"),
				"type": "side"
			},
			{
				"title": "Кроссовки Nike NMD",
				"src": getJsonServerImage("/img/7.jpg"),
				"type": "side"
			},
			{
				"title": "Кроссовки Nike NMD",
				"src": getJsonServerImage("/img/7-reverse.jpg"),
				"type": "side"
			}
		],
		"isStock": true,
		"rating": 5,
		"reviewCount": 434,
		"category": [
			"Обувь",
			"Кроссовки",
			"Спортивная обувь"
		],
		"tags": [
			"баскетбол",
			"спорт",
			"поддержка",
			"высокие"
		],
		"badge": "isDiscount",
		"discount": "16"
	},
	{
		"id": "3",
		"type": "sneakers",
		"name": "Кроссовки Nike Air VaporMax",
		"brand": "Nike",
		"model": "Air VaporMax",
		"shortDescription": "Кроссовки Nike Air VaporMax с поддерживающей амортизацией,\n\t\t созданной для плавного бега,\n\t\t  представляет собой совершенно новый взгляд на знакомую коллекцию.",
		"description": [
			"Кроссовки Кроссовки Nike Air VaporMax с поддерживающей амортизацией,\n\t созданной для плавного бега,\n\t  представляет собой совершенно новый взгляд на знакомую коллекцию.",
			"Модель Air VaporMax названа в честь команды \"Nike Team\".\n\t\t Впервые модель появилась на площадках в 1974 году.\n\t\t  Сейчас это уже классика lifestyle от Nike.",
			"— натуральная кожа для верха кроссовок",
			"— укрепляющие вставки из натуральной замши",
			"— контрастный дизайн",
			"— прямая шнуровка",
			"— амортизирующая подошва"
		],
		"specifications": {
			"sex": "Мужское",
			"country": "Бангладеш",
			"material": [
				"замша",
				"текстиль",
				"резина",
				"пена"
			],
			"collection": "Heritage",
			"warranty": "1 год",
			"releaseYear": "2020"
		},
		"variants": [
			{
				"color": "pink",
				"colorHex": "FFC0CB",
				"isSelected": false,
				"images": [],
				"availableSizes": [
					{
						"eu": "36",
						"inStock": true,
						"quantity": 2
					},
					{
						"eu": "36.5",
						"inStock": true,
						"quantity": 13
					},
					{
						"eu": "37",
						"inStock": true,
						"quantity": 10
					},
					{
						"eu": "37.5",
						"inStock": true,
						"quantity": 1
					},
					{
						"eu": "38",
						"inStock": true,
						"quantity": 16
					},
					{
						"eu": "38.5",
						"inStock": true,
						"quantity": 1
					},
					{
						"eu": "39",
						"inStock": true,
						"quantity": 12
					},
					{
						"eu": "39.5",
						"inStock": true,
						"quantity": 1
					},
					{
						"eu": "40",
						"inStock": true,
						"quantity": 20
					},
					{
						"eu": "40.5",
						"inStock": true,
						"quantity": 10,
						"isSelected": true
					},
					{
						"eu": "41",
						"inStock": true,
						"quantity": 0
					},
					{
						"eu": "41.5",
						"inStock": true,
						"quantity": 12
					},
					{
						"eu": "42",
						"inStock": true,
						"quantity": 3
					},
					{
						"eu": "42.5",
						"inStock": true,
						"quantity": 15
					},
					{
						"eu": "43",
						"inStock": true,
						"quantity": 6
					},
					{
						"eu": "43.5",
						"inStock": true,
						"quantity": 2
					},
					{
						"eu": "44",
						"inStock": true,
						"quantity": 11
					},
					{
						"eu": "44.5",
						"inStock": true,
						"quantity": 14
					}
				]
			},
			{
				"color": "purple",
				"colorHex": "6A0DAD",
				"isSelected": true,
				"images": [],
				"availableSizes": [
					{
						"eu": "36",
						"inStock": true,
						"quantity": 2
					},
					{
						"eu": "36.5",
						"inStock": true,
						"quantity": 16
					},
					{
						"eu": "37",
						"inStock": true,
						"quantity": 16
					},
					{
						"eu": "37.5",
						"inStock": true,
						"quantity": 9
					},
					{
						"eu": "38",
						"inStock": true,
						"quantity": 13
					},
					{
						"eu": "38.5",
						"inStock": true,
						"quantity": 14
					},
					{
						"eu": "39",
						"inStock": true,
						"quantity": 16
					},
					{
						"eu": "39.5",
						"inStock": true,
						"quantity": 8
					},
					{
						"eu": "40",
						"inStock": false,
						"quantity": 19
					},
					{
						"eu": "40.5",
						"inStock": false,
						"quantity": 13,
						"isSelected": true
					},
					{
						"eu": "41",
						"inStock": true,
						"quantity": 9
					},
					{
						"eu": "41.5",
						"inStock": true,
						"quantity": 11
					},
					{
						"eu": "42",
						"inStock": true,
						"quantity": 14
					},
					{
						"eu": "42.5",
						"inStock": true,
						"quantity": 5
					},
					{
						"eu": "43",
						"inStock": true,
						"quantity": 1
					},
					{
						"eu": "43.5",
						"inStock": true,
						"quantity": 9
					},
					{
						"eu": "44",
						"inStock": true,
						"quantity": 6
					},
					{
						"eu": "44.5",
						"inStock": false,
						"quantity": 15
					}
				]
			}
		],
		"price": {
			"currentPrice": 8745,
			"currency": "RUB"
		},
		"images": [
			{
				"title": "Кроссовки Nike Air VaporMax",
				"src": getJsonServerImage("/img/8.jpg"),
				"type": "main"
			},
			{
				"title": "Кроссовки Nike Air VaporMax",
				"src": getJsonServerImage("/img/8-reverse.jpg"),
				"type": "side"
			},
			{
				"title": "Кроссовки Nike Air VaporMax",
				"src": getJsonServerImage("/img/8.jpg"),
				"type": "side"
			},
			{
				"title": "Кроссовки Nike Air VaporMax",
				"src": getJsonServerImage("/img/8-reverse.jpg"),
				"type": "side"
			},
			{
				"title": "Кроссовки Nike Air VaporMax",
				"src": getJsonServerImage("/img/8.jpg"),
				"type": "side"
			}
		],
		"isStock": true,
		"rating": 3,
		"reviewCount": 351,
		"category": [
			"Обувь",
			"Кроссовки",
			"Беговая обувь"
		],
		"tags": [
			"баскетбол",
			"спорт",
			"поддержка",
			"высокие"
		]
	},
];

export const handlers = [
	// Мокирование одного товарова
	http.get('*/products/1', () => {
		console.log('MSW: Intercepted all products request');

		return HttpResponse.json(mockProducts[0], {
			status: 200,
		});
	}),

	// Мокирование всех товаров
	http.get('*/products', () => {
		console.log('MSW: Intercepted all products request');

		return HttpResponse.json(mockProducts, {
			status: 200,
		});
	}),

	// Мокирование избранного
	http.get('*/favorites', () => {
		console.log('MSW: Intercepted favorites request');

		return HttpResponse.json({
			ids: ['1', '2', '3'],
		}, {
			status: 200,
		});
	}),
];