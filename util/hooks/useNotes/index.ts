import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuid } from "uuid";

import { BLANK_NOTE } from "@constants/editor";
import { useDBQueries } from "@db/useDBQuery";
import { noteContentState, notesState, noteState } from "@state/notes";
import Note, { NoteContent } from "@type/note";

// -----[Gloabl State]-----

export default function useNotes() {
	const [notes, setNotes] = useRecoilState(notesState);
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
	} = useDBQueries();

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
		const load = async () => {
			const list = (await getNotes()).sort(
				(a, b) => b.updated_at.getTime() - a.updated_at.getTime()
			);
			if (note) return;
			if (!list.at(0)) return;

			setNote(list.at(0));
			router.push(`/${list.at(0).id}`, undefined, { shallow: true });
		};
		load();
	}, [note]);

	useEffect(() => {
		if (!id) return;

		const load = async () => setNote(await getNote(id as string));
		load();
	}, [id]);

	useEffect(() => {
		if (id || !notes.length) return;
		setNote(notes.at(0));
		router.push(`/${notes.at(0).id}`, undefined, { shallow: true });
	}, [id]);

	const removeCurrent = async () => {
		if (!id) return;
		await removeOneNote(id as string);
		await refresh();
		setNote(null);
	};
	const removeBatch = async (ids: string[]) => {
		await removeManyNotes(ids);
		await refresh();
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
			file: JSON.stringify(BLANK_NOTE),
		};

		await Promise.all([addOneNote(note), addContent(content)]);
		setNote(note);
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
