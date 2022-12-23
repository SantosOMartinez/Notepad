export default interface Note {
	id: string;
	locked?: boolean;
	image?: string;
	title?: string;
	description?: string;
	created_at: Date;
	updated_at: Date;
	location?: {
		name?: string;
		id?: string;
	};
}

export type PartialNote = Partial<Note> & { id: string };

export interface NoteContent {
	id: string;
	file: string;
}

export interface NoteLock {
	id: string;
	password: string;
}
