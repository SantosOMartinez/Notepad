import { Media } from "./media";
import { Text } from "./text";

export enum HeadingType {
	Title = "title",
	Heading = "heading",
	Subheading = "subheading",
}

export enum ListType {
	BulletedList = "bulleted-list",
	DashedList = "dashed-list",
	NumberedList = "numbered-list",
	CheckedList = "checked-list",
}

export enum UtilType {
	ListItem = "list-item",
	Media = "media",
	Table = "table",
	TBody = "table-body",
	THead = "table-head",
	TRow = "table-row",
	TCell = "table-cell",
	THeader = "table-cell-head",
}

export enum TextType {
	Body = "body",
	Monospaced = "monospaced",
}

export type ElementType = ListType | UtilType | HeadingType | TextType;
export const ElementType = {
	...HeadingType,
	...ListType,
	...TextType,
	...UtilType,
};

export interface Element<T extends ElementType = ElementType, C = unknown> {
	type: T;
	children?: C;
}

export type TextElement = Element<ElementType, Text[]>;

export type MediaElement = Element<UtilType.Media, Media>;
