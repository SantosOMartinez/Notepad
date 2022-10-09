export enum BlockStyle {
	Title = "Title",
	Heading = "Heading",
	Subheading = "Subheading",
	Body = "Body",
	Monospaced = "Monospaced",
	BulletedList = "• Bulleted List",
	DashedList = "- Dashed List",
	NumberedList = "1. Numbered List",
}

export enum TextType {
	Bold = "Bold",
	Italic = "Italic",
	Underline = "Underline",
	Strikethrough = "Strikethrough",
}

export interface Text {
	type: TextType;
	content: string;
	link?: Link;
	annotations: Annotations;
}

export interface Link {
	url: string;
	type: "url" | "";
}

export interface Annotations {
	bold: Boolean;
	color: Color;
	italic: Boolean;
	strikethrough: Boolean;
	underline: Boolean;
}

export enum Color {
	default,
	Red,
	Green,
	Blue,
	// etc...
}
