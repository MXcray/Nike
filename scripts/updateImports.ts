import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];

function isAbsolute(value: string) {
	return layers.some((layer) => value.startsWith(layer));
}

function isLayerPath(value: string) {
	return layers.some((layer) => value.startsWith(`src/${layer}`));
}

files.forEach((sourceFile) => {
	const importDeclarations = sourceFile.getImportDeclarations();
	importDeclarations.forEach((importDeclaration) => {
		let value = importDeclaration.getModuleSpecifierValue();

		if (isLayerPath(value)) {
			value = value.replace(/^src\//, '@/');
			importDeclaration.setModuleSpecifier(value);
		} else if (isAbsolute(value)) {
			importDeclaration.setModuleSpecifier(`@/${value}`);
		}
	});
});

project.save();
