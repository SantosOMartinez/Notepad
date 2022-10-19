import { useRouter } from "next/router";
import { useEffect } from "react";

import Editor from "@components/Editor";
import useNotes from "@hooks/useNotes";
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";

interface Props {}

export default ({}: Props) => {
	const router = useRouter();
	const { id } = router.query;
	const [editor] = useLexicalComposerContext();
	const { content, note, notes } = useNotes();

	useEffect(() => {
		if (!id) return;
		const state = content ? editor.parseEditorState(content.file) : null;
		state && editor.setEditorState(state);
	}, [content]);

	return (
		<Editor
			date={note?.updated_at}
			visible={!!id && notes.length > 0 && !!note}
		/>
	);
};
