import { Media } from "./media";
import { Text } from "./text";

export enum ElementType {
	//Text Types
	Title = "title",
	Heading = "heading",
	Subheading = "subheading",
	Body = "body",
	Monospaced = "Monospaced",
	BulletedList = "bulleted-list",
	DashedList = "dashed-list",
	NumberedList = "numbered-list",

	// Utility Types
	ListItem = "list-item",
	Media = "media",
	Table = "table",
	TBody = "table-body",
	THead = "table-head",
	TRow = "table-row",
	TCell = "table-cell",
	THeader = "table-cell-head",
}

export interface Element<T extends ElementType = ElementType, C = unknown> {
	type: T;
	children?: C;
}

export type TextElement = Element<ElementType, Text[]>;

export type MediaElement = Element<ElementType.Media, Media>;
