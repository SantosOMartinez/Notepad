import { atom } from "recoil";

import { Search } from "@type/search";

export const searchState = atom<Search>({
	key: "searchState",
	default: { text: "", tag: null },
});
