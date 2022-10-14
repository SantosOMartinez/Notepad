import { IconName } from "./icons";

export enum SearchTag {
	Shared = "Shared",
	Locked = "Locked",
	Checklists = "Checklists",
	Drawings = "Drawings",
	Scanned = "Scanned",
	Attachments = "Attachments",
}

export interface Suggestion {
	icon: IconName;
	name: string;
	tag: SearchTag;
}

export interface Search {
	text: string;
	tag?: SearchTag;
}
