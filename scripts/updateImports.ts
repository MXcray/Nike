import * as fs from 'fs';
import * as path from 'path';

// Корневая директория проекта
const rootDir = process.cwd();
const srcDir = path.resolve(rootDir, 'src');

// Слои FSD архитектуры (от верхнего к нижнему)
const fsdLayers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

// Расширения файлов для обработки
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

// Регулярное выражение для поиска импортов
const importRegex = /import\s+(?:(?:{[^}]*}|\*\s+as\s+[^;]*|[^;{}]*)\s+from\s+)?['"]([^'"]+)['"]/g;

/**
 * Проверяет, является ли путь относительным
 */
function isRelativePath(importPath: string): boolean {
	return importPath.startsWith('./') || importPath.startsWith('../');
}

/**
 * Проверяет, является ли путь внешней библиотекой
 */
function isExternalLibrary(importPath: string): boolean {
	return !importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('@');
}

/**
 * Исправляет слеши в пути импорта (заменяет обратные слеши на прямые)
 */
function fixSlashes(importPath: string): string {
	return importPath.replace(/\\/g, '/');
}

/**
 * Определяет слой FSD для заданного пути
 */
function getLayerFromPath(filePath: string): string | null {
	const relativePath = path.relative(srcDir, filePath);
	const pathParts = relativePath.split(path.sep);

	if (pathParts.length > 0 && fsdLayers.includes(pathParts[0])) {
		return pathParts[0];
	}

	return null;
}

/**
 * Проверяет, соответствует ли импорт правилам FSD архитектуры
 * (нижние слои не должны импортировать верхние)
 */
function validateFsdImport(fromFilePath: string, toImportPath: string): boolean {
	// Если это внешняя библиотека, всегда разрешаем
	if (isExternalLibrary(toImportPath)) {
		return true;
	}

	// Если импорт уже использует алиас, извлекаем путь
	let importPathWithoutAlias = toImportPath;
	if (toImportPath.startsWith('@/')) {
		importPathWithoutAlias = toImportPath.substring(2);
	}

	// Определяем слои для текущего файла и импортируемого модуля
	const fromLayer = getLayerFromPath(fromFilePath);

	// Если не удалось определить слой текущего файла, разрешаем импорт
	if (!fromLayer) {
		return true;
	}

	// Извлекаем слой из импортируемого пути
	const importParts = importPathWithoutAlias.split('/');
	if (importParts.length > 0 && fsdLayers.includes(importParts[0])) {
		const toLayer = importParts[0];

		// Получаем индексы слоев в иерархии FSD
		const fromLayerIndex = fsdLayers.indexOf(fromLayer);
		const toLayerIndex = fsdLayers.indexOf(toLayer);

		// Проверяем, что слой импортирует только из слоев ниже или равных себе
		// В FSD верхние слои могут импортировать нижние, но не наоборот
		if (fromLayerIndex > toLayerIndex) {
			console.warn(`⚠️ Нарушение FSD: ${fromLayer} импортирует из
			 ${toLayer} в файле ${path.relative(rootDir, fromFilePath)}`);
			return false;
		}
	}

	return true;
}

/**
 * Проверяет, находятся ли два пути в одном модуле FSD
 */
function areInSameModule(filePath: string, importPath: string): boolean {
	// Получаем относительный путь от src для текущего файла
	const fileRelativeToSrc = path.relative(srcDir, filePath);

	// Если импорт уже использует алиас, извлекаем путь
	let importPathWithoutAlias = importPath;
	if (importPath.startsWith('@/')) {
		importPathWithoutAlias = importPath.substring(2);
	} else if (isRelativePath(importPath)) {
		// Если это относительный путь, преобразуем его в абсолютный
		const absoluteImportPath = path.resolve(path.dirname(filePath), importPath);
		importPathWithoutAlias = path.relative(srcDir, absoluteImportPath);
	} else {
		// Если это не алиас и не относительный путь, значит это внешняя библиотека
		return false;
	}

	// Разбиваем пути на части
	const fileParts = fileRelativeToSrc.split(path.sep);
	const importParts = importPathWithoutAlias.split('/');

	// Проверяем, что оба пути находятся в одном слое и модуле
	if (fileParts.length >= 2 && importParts.length >= 2) {
		return fileParts[0] === importParts[0] && fileParts[1] === importParts[1];
	}

	return false;
}

/**
 * Преобразует абсолютный путь с алиасом в относительный путь
 */
function convertToRelativePath(filePath: string, importPath: string): string {
	// Если это не путь с алиасом, оставляем как есть
	if (!importPath.startsWith('@/')) {
		return importPath;
	}

	// Извлекаем путь без алиаса
	const importPathWithoutAlias = importPath.substring(2);

	// Получаем абсолютный путь импорта
	const absoluteImportPath = path.resolve(srcDir, importPathWithoutAlias);

	// Получаем относительный путь от текущего файла
	let relativePath = path.relative(path.dirname(filePath), absoluteImportPath);

	// Исправляем слеши
	relativePath = fixSlashes(relativePath);

	// Добавляем ./ если путь не начинается с ../
	if (!relativePath.startsWith('.')) {
		relativePath = './' + relativePath;
	}

	return relativePath;
}

/**
 * Преобразует относительный путь в абсолютный с использованием алиаса
 */
function convertToAliasPath(filePath: string, importPath: string): string {
	// Если это внешняя библиотека, оставляем как есть
	if (isExternalLibrary(importPath)) {
		return importPath;
	}

	// Исправляем слеши в пути
	importPath = fixSlashes(importPath);

	// Если путь уже использует алиас, оставляем как есть (но исправляем слеши)
	if (importPath.startsWith('@/')) {
		return importPath;
	}

	// Получаем абсолютный путь импорта
	const absoluteImportPath = path.resolve(path.dirname(filePath), importPath);

	// Получаем относительный путь от src
	const relativeToSrc = path.relative(srcDir, absoluteImportPath);

	// Проверяем, что путь находится внутри src
	if (relativeToSrc.startsWith('..') || path.isAbsolute(relativeToSrc)) {
		return importPath; // Путь за пределами src, оставляем как есть
	}

	// Проверяем, находятся ли файлы в одном модуле
	if (areInSameModule(filePath, importPath)) {
		return importPath; // Оставляем относительный путь для файлов в одном модуле
	}

	// Преобразуем в путь с алиасом и исправляем слеши
	const aliasPath = `@/${fixSlashes(relativeToSrc)}`;

	// Проверяем соответствие правилам FSD
	validateFsdImport(filePath, aliasPath);

	return aliasPath;
}

/**
 * Обновляет импорты в файле
 */
function updateImportsInFile(filePath: string): void {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		let updated = false;

		// Заменяем импорты
		const newContent = content.replace(importRegex, (match, importPath) => {
			// Исправляем слеши в пути импорта
			const fixedImportPath = fixSlashes(importPath);

			// Если путь был исправлен, отмечаем, что файл был обновлен
			if (fixedImportPath !== importPath) {
				updated = true;
				match = match.replace(importPath, fixedImportPath);
				importPath = fixedImportPath;
			}

			// Если это относительный путь, проверяем, нужно ли преобразовать его в путь с алиасом
			if (isRelativePath(importPath)) {
				// Проверяем, находятся ли файлы в одном модуле
				if (areInSameModule(filePath, importPath)) {
					return match; // Оставляем относительный путь для файлов в одном модуле
				}

				const aliasPath = convertToAliasPath(filePath, importPath);
				if (aliasPath !== importPath) {
					updated = true;
					return match.replace(importPath, aliasPath);
				}
			} else if (importPath.startsWith('@/')) {
				// Проверяем, находятся ли файлы в одном модуле
				if (areInSameModule(filePath, importPath)) {
					// Преобразуем путь с алиасом в относительный
					const relativePath = convertToRelativePath(filePath, importPath);
					updated = true;
					return match.replace(importPath, relativePath);
				}

				// Проверяем существующие алиасы на соответствие FSD
				validateFsdImport(filePath, importPath);
			}

			return match;
		});

		// Если были изменения, записываем файл
		if (updated) {
			fs.writeFileSync(filePath, newContent, 'utf-8');
			console.log(`✅ Обновлены импорты в: ${path.relative(rootDir, filePath)}`);
		}
	} catch (error) {
		console.error(`❌ Ошибка при обработке файла ${filePath}:`, error);
	}
}

/**
 * Рекурсивно обходит директорию и обрабатывает файлы
 */
function processDirectory(dirPath: string): void {
	const entries = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry.name);

		if (entry.isDirectory()) {
			// Пропускаем node_modules и .git
			if (entry.name !== 'node_modules' && entry.name !== '.git') {
				processDirectory(fullPath);
			}
		} else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
			updateImportsInFile(fullPath);
		}
	}
}

/**
 * Основная функция
 */
function main(): void {
	console.log('🚀 Начинаем обновление импортов...');

	// Обрабатываем только директорию src
	processDirectory(srcDir);

	console.log('✨ Обновление импортов завершено!');
}

// Запускаем скрипт
main();