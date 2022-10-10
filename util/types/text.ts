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
	Title = "Title",
	Heading = "Heading",
	Subheading = "Subheading",
	Body = "Body",
	Monospaced = "Monospaced",
	BulletedList = "• Bulleted List",
	DashedList = "- Dashed List",
	NumberedList = "1. Numbered List",
}

export interface TextElement {
	type: TextType;
	children?: Text[];
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
