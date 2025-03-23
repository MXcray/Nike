export interface HeaderLinkType {
	path: string;
	text: string;
}

interface HeaderBaseCategory {
	title: string;
}

interface HeaderAccordionCategory extends HeaderBaseCategory{
	accordion: true;
	items: HeaderLinkType[];

}
interface HeaderCategory extends HeaderBaseCategory{
	accordion?: false,
	path: string;
}

export type HeaderCategoryType = HeaderAccordionCategory | HeaderCategory;