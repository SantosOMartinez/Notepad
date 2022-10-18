export default interface Note {
	id: string;
	title?: string;
	description?: string;
	locked?: boolean;
	created_at: Date;
	updated_at: Date;
	image?: string;
	location: string | null;
	document: string;
}

export interface NotePreview {
	id: string;
	title?: string;
	description?: string;
	locked?: boolean;
	date?: Date;
	image?: string;
	location: string | null;
}
