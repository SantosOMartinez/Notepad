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
