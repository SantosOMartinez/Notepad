import { DBSchema, IDBPDatabase } from "idb";

import Note from "./note";

export type NotesSchema = IDBPDatabase<NotesDBV1> | null;

export enum DB {
	Notes = "notes",
}

export interface NotesDBV1 extends DBSchema {
	notes: {
		key: string;
		value: Note;
		indexes: {
			by_id: string;
			created_at: Date;
			updated_at: Date;
			by_location: string | null;
		};
	};
}

export type Indexes = keyof NotesDBV1["notes"]["indexes"];
