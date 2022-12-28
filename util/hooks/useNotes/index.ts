import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuid } from "uuid";

import { BLANK_NOTE } from "@constants/editor";
import { useDBQueries } from "@db/useDBQuery";
import {
    locationState,
    noteContentState,
    notesState,
    noteState
} from "@state/notes";
import Note, { NoteContent } from "@type/note";

// -----[Gloabl State]-----

export default function useNotes() {
	const [notes, setNotes] = useRecoilState(notesState);
	const location = useRecoilValue(locationState);
	const [note, setNote] = useRecoilState(noteState);
	const [content, setContent] = useRecoilState(noteContentState);
	const router = useRouter();
	const { id } = router.query;

	const {
		updateNote,
		getNotes,
		getNote,
		getContent,
		removeManyNotes,
		removeOneNote,
		addOneNote,
		updateContent,
		addContent,
		lockNote,
		isLocked,
		hasLock,
		createLock,
		removeLock,
		updateLock,
		isConnected,
		noteExists,
	} = useDBQueries();

	useEffect(() => {
		if (!id) return;

		const check = async () => {
			const note = await getNote(id as string);

			if (note && note?.location?.id === location?.id) return;

			router.push("/", undefined, { shallow: true });
		};
		check();
	}, [id, location]);

	const refresh = async () => {
		const list = await getNotes();
		setNotes(
			[...list].sort(
				(a, b) => b.updated_at.getTime() - a.updated_at.getTime()
			)
		);
	};

	useEffect(() => {
		refresh();
	}, [isConnected]);

	useEffect(() => {
		if (!id) return;

		const load = async () => {
			setNote(await getNote(id as string));
			setContent(await getContent(id as string));
		};
		load();
	}, [id]);

	const removeCurrent = async () => {
		if (!id) return;
		await removeOneNote(id as string);
		await refresh();
		setNote(null);
		setContent(null);
	};
	const removeBatch = async (ids: string[]) => {
		await removeManyNotes(ids);
		await refresh();
	};

	const createBlankNote = async (options: Partial<Omit<Note, "id">> = {}) => {
		const id = uuid();
		const date = new Date();
		const note: Note = {
			...options,
			id,
			created_at: date,
			updated_at: date,
		};

		const content: NoteContent = {
			id,
			file: JSON.stringify(BLANK_NOTE),
		};

		await Promise.all([addOneNote(note), addContent(content)]);
		setNote(note);
		setContent(content);
		router.push(`/${id}`, undefined, { shallow: true });

		await refresh();
		return note;
	};

	const updateCurrentNote = async (changes: Partial<Note>) => {
		setNote(await updateNote({ ...changes, id: note.id }));
		await refresh();
	};

	const updateCurrentContent = async (changes: Partial<NoteContent>) => {
		setContent(await updateContent({ id: content.id, file: changes.file }));
		await refresh();
	};

	return {
		removeCurrent,
		removeBatch,
		createBlankNote,
		updateNote: updateCurrentNote,
		updateContent: updateCurrentContent,
		refresh,
		note,
		notes,
		content,
		isConnected,
	};
}
