import { DB, Indexes } from "@type/db";
import { Page } from "@type/lists";
import Note from "@type/note";

import { Database } from "./";

export interface DBQueryResult {
	addOneNote: (note: Note) => Promise<void>;
	addManyNotes: (notes: Note[]) => Promise<void>;
	removeOneNote: (id: string) => Promise<void>;
	removeManyNotes: (notes: string[]) => Promise<void>;
	clearNotes: () => Promise<void>;
	getNote: (id: string) => Promise<Note>;
	getNotes: (by?: Indexes) => Promise<Note[]>;
	noteExists: (notes: string) => Promise<boolean>;
	notesExists: (notes: string[]) => Promise<boolean>;
	getFilteredNotes: (by: IDBKeyRange) => Promise<Note[]>;
	updateNote: (note: Partial<Note>) => Promise<Note>;
	getPagedNotes: (
		cursor: number,
		page: number,
		by: Indexes
	) => Promise<Page<Note>>;
}

export default function dbQueries(db: Database): DBQueryResult {
	const addOneNote = async (note: Note) => {
		await db.notes.add(DB.Notes, note);
	};

	const addManyNotes = async (notes: Note[]) => {
		const tx = db.notes.transaction(DB.Notes, "readwrite");
		await Promise.all([
			...notes.map((note) => tx.store.add(note)),
			tx.done,
		]);
	};

	const removeOneNote = async (id: string) => {
		await db.notes.delete(DB.Notes, id);
	};

	const removeManyNotes = async (notes: string[]) => {
		const tx = db.notes.transaction(DB.Notes, "readwrite");
		await Promise.all([...notes.map((id) => tx.store.delete(id)), tx.done]);
	};

	const clearNotes = async () => {
		await db.notes.clear(DB.Notes);
	};

	const getNote = async (id: string) => {
		return await db.notes.get(DB.Notes, id);
	};

	const getNotes = async (by: Indexes = "updated_at") => {
		return await db.notes.getAllFromIndex(DB.Notes, by);
	};

	const getFilteredNotes = async (by: IDBKeyRange) => {
		return await db.notes.getAll(DB.Notes, by);
	};

	const noteExists = async (id: string) => {
		return !!(await db.notes.get(DB.Notes, id));
	};

	const notesExists = async (notes: string[]) => {
		const tx = db.notes.transaction(DB.Notes, "readonly");
		const data = await Promise.all(notes.map((id) => tx.store.get(id)));
		await tx.done;

		return data.every((note) => note);
	};

	/**
	 * Gets a paginated list of histories based on the provided cursor.
	 * @todo Implement pagination for histories.
	 * @param cursor Current position to start fetching from.
	 * @param page Size of the page.
	 * @returns List of histories.
	 */
	const getPagedNotes = async (
		cursor = 0,
		page = 20,
		by: Indexes = "updated_at"
	): Promise<Page<Note>> => {
		// TODO: Implement pagination for histories.
		return {
			cursor: null,
			hasMore: false,
			data: await db.notes.getAllFromIndex(DB.Notes, by),
		};
	};

	if (!db)
		return {
			addOneNote: () => Promise.resolve(),
			addManyNotes: () => Promise.resolve(),
			removeOneNote: () => Promise.resolve(),
			getFilteredNotes: () => Promise.resolve([]),
			removeManyNotes: () => Promise.resolve(),
			updateNote: () => Promise.resolve(null),
			clearNotes: () => Promise.resolve(),
			getNote: () => Promise.resolve(null),
			getNotes: () => Promise.resolve([]),
			noteExists: () => Promise.resolve(false),
			notesExists: () => Promise.resolve(false),
			getPagedNotes: () =>
				Promise.resolve({
					cursor: null,
					hasMore: false,
					data: [],
				}),
		};

	const updateNote = async (note: Note) => {
		// We only want to update exist templates.
		const old = await getNote(note.id);
		if (!old) return note;

		const isSame = JSON.stringify(old) === JSON.stringify(note);
		if (isSame) return note;

		const newNote: Note = {
			...note,
			updated_at: new Date(),
		};
		await db.notes!.put(DB.Notes, newNote);
		return newNote;
	};

	return {
		addOneNote,
		addManyNotes,
		removeOneNote,
		removeManyNotes,
		clearNotes,
		getNote,
		getNotes,
		noteExists,
		getFilteredNotes,
		notesExists,
		getPagedNotes,
		updateNote,
	};
}
