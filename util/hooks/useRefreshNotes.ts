import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { useDBQueries } from "@db/useDBQuery";
import { noteListState, noteState } from "@state/toolbar";

export default function useRefreshNotes() {
	const router = useRouter();
	const { id } = router.query;
	const { getNotes, getNote } = useDBQueries();

	const [list, setList] = useRecoilState(noteListState);
	const setNote = useSetRecoilState(noteState);

	const refreshList = async () => {
		setList((await getNotes("updated_at")).reverse());
	};

	const refreshSelected = async () => {
		if (!id) return setNote(null);
		setNote(await getNote(id as string));
	};

	useEffect(() => {
		refreshList().then(refreshSelected);
	}, [id]);

	useEffect(() => {
		if (id || list.length === 0) return;
		setNote(list.at(0));
		router.push(`/${list.at(0).id}`, undefined, { shallow: true });
	}, [id, list]);

	return { refreshList, refreshSelected };
}
