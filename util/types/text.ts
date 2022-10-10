import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

// Override Slate Js text definitions.
declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: TextElement;
		Text: Text;
	}
}

export enum TextType {
	Title = "title",
	Heading = "heading",
	Subheading = "subheading",
	Body = "body",
	Monospaced = "Monospaced",
	BulletedList = "bulleted-list",
	DashedList = "dashed-list",
	NumberedList = "numbered-list",
}

export enum HelperType {
	ListItem = "list-item",
	Image = "image",
	Table = "table",
	TBody = "table-body",
	THead = "table-head",
	TRow = "table-row",
	TCell = "table-cell",
	THeader = "table-cell-head",
}

export type ElementType = TextType | HelperType;

export interface TextElement {
	type: ElementType;
	children?: Text[];
	url?: string;
}

export interface Text {
	text: string;
	link?: Link;
	annotations?: Annotations;
	color?: Color;
}

export interface Link {
	url: string;
}

export interface Annotations {
	bold?: boolean;
	italic?: boolean;
	strikethrough?: boolean;
	underline?: boolean;
}

export enum Color {
	default,
	Red,
	Green,
	Blue,
	// etc...
}
