import { DB, Indexes } from "@type/db";
import { Page } from "@type/lists";
import Note, { NoteContent, NoteLock, PartialNote } from "@type/note";

import { Database } from "./";

export interface DBQueryResult {
	addOneNote: (note: Note) => Promise<void>;
	addContent: (content: NoteContent) => Promise<void>;
	addManyNotes: (notes: Note[]) => Promise<void>;
	removeOneNote: (id: string) => Promise<void>;
	removeManyNotes: (notes: string[]) => Promise<void>;
	clearNotes: () => Promise<void>;
	getNote: (id: string) => Promise<Note>;
	getNotes: (by?: Indexes) => Promise<Note[]>;
	noteExists: (notes: string) => Promise<boolean>;
	notesExists: (notes: string[]) => Promise<boolean>;
	getFilteredNotes: (by: IDBKeyRange) => Promise<Note[]>;
	updateNote: (note: PartialNote) => Promise<Note>;
	updateContent: (content: NoteContent) => Promise<NoteContent>;
	getContent: (id: string) => Promise<NoteContent>;

	getPagedNotes: (
		cursor: number,
		page: number,
		by: Indexes
	) => Promise<Page<Note>>;

	lockNote: (id: string) => Promise<boolean>;
	unlockNote: (id: string, password: string) => Promise<boolean>;
	createLock: (id: string, password: string) => Promise<boolean>;
	removeLock: (id: string, password: string) => Promise<boolean>;
	updateLock: (
		id: string,
		password: string,
		newPassword: string
	) => Promise<boolean>;
	hasLock: (id: string) => Promise<boolean>;
	isLocked: (id: string) => Promise<boolean>;
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

	const getNoteContent = async (id: string) => {
		return await db.notes.get(DB.Content, id);
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

	const updateNote = async (note: PartialNote) => {
		// We only want to update exist templates.
		const old = await getNote(note.id);
		if (!old) return null;

		const isSame = JSON.stringify(old) === JSON.stringify(note);
		if (isSame) return old;

		const newNote: Note = {
			...old,
			...note,
			updated_at: new Date(),
		};
		await db.notes.put(DB.Notes, newNote);
		return newNote;
	};

	const updateContent = async (content: NoteContent) => {
		// We only want to update exist templates.
		const old = await getNoteContent(content.id);
		if (!old) return content;

		const isSame = JSON.stringify(old) === JSON.stringify(content);
		if (isSame) return content;

		await db.notes.put(DB.Content, content);
		return content;
	};

	const getContent = async (id: string) => {
		return await db.notes.get(DB.Content, id);
	};

	const addContent = async (content: NoteContent) => {
		await db.notes.add(DB.Content, content);
	};

	const getLock = async (id: string) => {
		return await db.notes.get(DB.Lock, id);
	};

	const lockNote = async (id: string) => {
		if (!(await hasLock(id))) return false;
		if (await isLocked(id)) return true;
		await updateNote({ id, locked: true });

		return true;
	};
	const unlockNote = async (id: string, password: string) => {
		// Secrets can't be hidden in the frontend. Hashing would be useless.
		if (!(await hasLock(id))) return false;
		if (!(await isLocked(id))) return true;

		const reference = (await getLock(id)).password;
		const isValid = password === reference;

		if (!isValid) return false;

		await updateNote({ id, locked: false });
		return true;
	};
	const createLock = async (id: string, password: string) => {
		// Secrets can't be hidden in the frontend. Hashing would be useless.
		if (await hasLock(id)) return true;

		await db.notes.add(DB.Lock, { id, password });
		return true;
	};
	const removeLock = async (id: string, password: string) => {
		// Secrets can't be hidden in the frontend. Hashing would be useless.

		if (!(await hasLock(id))) return true;

		const reference = (await getLock(id)).password;
		const isValid = password === reference;

		if (!isValid) return false;

		await Promise.all([
			db.notes.delete(DB.Lock, id),
			updateNote({ id, locked: false }),
		]);

		return true;
	};
	const updateLock = async (
		id: string,
		password: string,
		newPassword: string
	) => {
		// Secrets can't be hidden in the frontend. Hashing would be useless.
		if (!(await hasLock(id))) return false;

		const reference = (await getLock(id)).password;
		const isValid = password === reference;

		if (!isValid) return false;

		await db.notes.put(DB.Lock, { id, password: newPassword });

		return true;
	};
	const hasLock = async (id: string) => {
		return !!(await getLock(id));
	};
	const isLocked = async (id: string) => {
		return (await getNote(id)).locked;
	};

	if (!db)
		return {
			addOneNote: () => Promise.resolve(),
			addContent: () => Promise.resolve(),
			addManyNotes: () => Promise.resolve(),
			removeOneNote: () => Promise.resolve(),
			getFilteredNotes: () => Promise.resolve([]),
			removeManyNotes: () => Promise.resolve(),
			updateNote: () => Promise.resolve(null),
			updateContent: () => Promise.resolve(null),
			clearNotes: () => Promise.resolve(),
			getNote: () => Promise.resolve(null),
			getNotes: () => Promise.resolve([]),
			noteExists: () => Promise.resolve(false),
			notesExists: () => Promise.resolve(false),
			getContent: () => Promise.resolve(null),
			getPagedNotes: () =>
				Promise.resolve({
					cursor: null,
					hasMore: false,
					data: [],
				}),
			lockNote: (id: string) => Promise.resolve(false),
			unlockNote: (id: string) => Promise.resolve(false),
			createLock: (id: string, password: string) =>
				Promise.resolve(false),
			removeLock: (id: string, password: string) =>
				Promise.resolve(false),
			updateLock: (id: string, password: string, newPassword: string) =>
				Promise.resolve(false),
			hasLock: (id: string) => Promise.resolve(false),
			isLocked: (id: string) => Promise.resolve(false),
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
		updateContent,
		lockNote,
		unlockNote,
		createLock,
		removeLock,
		updateLock,
		hasLock,
		isLocked,
		getContent,
		addContent,
	};
}
