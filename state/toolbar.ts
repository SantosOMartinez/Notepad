import { atom } from "recoil";

import Note from "@type/note";
import { Search } from "@type/search";

export const searchState = atom<Search>({
	key: "searchState",
	default: { text: "", tag: null },
});

export const locationState = atom<string | null>({
	key: "locationState",
	default: null,
});

export const noteState = atom<Note | null>({
	default: null,
	key: "noteState",
});

export const noteListState = atom<Note[]>({
	default: [],
	key: "noteListState",
});
