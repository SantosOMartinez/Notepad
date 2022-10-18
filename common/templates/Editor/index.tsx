import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import Editor from "@components/Editor";
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import { noteListState, noteState } from "@state/toolbar";

interface Props {}

export default ({}: Props) => {
	const router = useRouter();
	const { id } = router.query;
	const [editor] = useLexicalComposerContext();
	const list = useRecoilValue(noteListState);
	const note = useRecoilValue(noteState);

	useEffect(() => {
		if (!id) return;
		const state = note ? editor.parseEditorState(note.document) : null;
		state && editor.setEditorState(state);
	}, [note]);

	return (
		<Editor
			date={note?.updated_at}
			visible={!!id && list.length > 0 && !!note}
		/>
	);
};
