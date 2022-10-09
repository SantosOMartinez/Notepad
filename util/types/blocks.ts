export enum BlockType {
	Text,
	Image,
}

export interface UserStamp {
	timestamp: string;
	id?: string;
}

export interface Block<T extends BlockType, C> {
	object: "block";
	id: string;
	createdBy: UserStamp;
	updatedBy: UserStamp;
	archived: boolean;
	type: T;
	content: C;
}
