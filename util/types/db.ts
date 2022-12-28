import { DBSchema, IDBPDatabase } from "idb";

import Note, { NoteContent, NoteLock } from "./note";

export type NotesSchema = IDBPDatabase<NotesDBV1> | null;

export enum DB {
	Notes = "notes",
	Content = "content",
	Lock = "lock",
}

export interface NotesDBV1 extends DBSchema {
	notes: {
		key: string;
		value: Note;
		indexes: {
			by_id: string;
			created_at: Date;
			updated_at: Date;
			by_location: string | undefined;
		};
	};

	content: {
		key: string;
		value: NoteContent;
		indexes: {
			by_id: string;
			created_at: Date;
			updated_at: Date;
		};
	};

	lock: {
		key: string;
		value: NoteLock;
		indexes: {
			by_id: string;
		};
	};
}

export type Indexes = keyof NotesDBV1["notes"]["indexes"];
