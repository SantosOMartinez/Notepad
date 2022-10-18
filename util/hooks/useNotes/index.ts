import { atom, useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { BLANK_NOTE } from "@constants/editor";
import { useDBQueries } from "@db/useDBQuery";

export interface Note {
	id: string;
	locked?: boolean;
	image?: string;
	title?: string;
	description?: string;
	created_at: Date;
	updated_at: Date;
}

export interface NoteContent {
	id: string;
	created_at: Date;
	updated_at: Date;
	file: string;
}

export interface NoteLock {
	id: string;
	password: string;
}

export enum OperationType {
	Create = "create",
	Read = "read",
	Update = "update",
	Delete = "delete",
}

export interface Operation<T = unknown> {
	type: OperationType;
	payload: T;
}

// -----[Gloabl State]-----
export const noteState = atom<Note | null>({
	key: "noteState",
	default: null,
});

export const notesState = atom<Note[]>({
	key: "notesState",
	default: [],
});

export const operationsState = atom<Operation[]>({
	key: "operationsState",
	default: [],
});

export const operationNoteState = atom<Note | null>({
	key: "operationNoteState",
	default: null,
});

export default function useNotes() {
	const [operation, setOperation] = useRecoilState(operationsState);
	const [operationNote, setOperationNote] =
		useRecoilState(operationNoteState);

	const [note, setNote] = useRecoilState(noteState);
	const [notes, setNotes] = useRecoilState(notesState);

	const { updateNote, getNotes, getNote, removeManyNotes, removeOneNote } =
		useDBQueries();

	const refreshNotes = async () => setNotes(await getNotes());
	const refreshNote = async () => setNote((await getNote(note.id)) ?? null);

	const deleteCurrent = async () => {
		await removeOneNote(note.id);
		await refreshNote();
	};
	const batchDelete = async (ids: string[]) => {
		await removeManyNotes(ids);
		await refreshNote();
	};

	const createBlankNote = async () => {
		const id = uuid();
		const date = new Date();
		const note: Note = {
			id,
			created_at: date,
			updated_at: date,
		};

		const content: NoteContent = {
			id,
			created_at: date,
			updated_at: date,
			file: JSON.stringify(BLANK_NOTE),
		};

		//TODO: Add note to db... but first modify db to include correct tables.
	};

	const updateCurrentNote = async (note: Partial<Note>) => {
		setNote(await updateNote(note));
		await refreshNotes();
	};
}
