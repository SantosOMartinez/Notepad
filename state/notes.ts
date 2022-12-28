import { atom } from "recoil";

import Note, { NoteContent } from "@type/note";

export const noteState = atom<Note | null>({
	key: "noteState",
	default: null,
});

export const noteContentState = atom<NoteContent | null>({
	key: "noteContentState",
	default: null,
});

export const notesState = atom<Note[]>({
	key: "notesState",
	default: [],
});

export const locationState = atom<{ id: string; name: string } | undefined>({
	key: "locationState",
	default: undefined,
});
