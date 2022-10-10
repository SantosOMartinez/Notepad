import { Text } from "./text";

export enum MediaType {
	Video = "video",
	Image = "image",
	Audio = "audio",
}

export interface Media {
	type: MediaType;
	url: string;
	alt: string;
	caption?: Text[];
}
