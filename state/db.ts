import { atom } from "recoil";

import { Database } from "@db/index";

export const dbState = atom<Database>({
	key: "dbState",
	default: null,
});
