import { EditorState } from "lexical";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import Editor from "@components/Editor";
import useNotes from "@hooks/useNotes";
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";

interface Props {}

const SAVE_INTERVAL = 5 * 1000; //5s

export default ({}: Props) => {
	const ref = useRef<EditorState>();
	const router = useRouter();
	const { id } = router.query;
	const [editor] = useLexicalComposerContext();
	const { content, note, notes, updateContent } = useNotes();

	useEffect(() => {
		if (!id) return;
		const state = content ? editor.parseEditorState(content.file) : null;
		state && editor.setEditorState(state);
	}, [content]);

	useEffect(() => {
		const interval = setInterval(async () => {
			const file = JSON.stringify(ref.current);
			if (!content || !file) return;

			console.log(file);

			await updateContent({
				id: content.id,
				file,
			});
		}, SAVE_INTERVAL);

		return () => clearInterval(interval);
	}, []);

	return (
		<Editor
			date={note?.updated_at}
			visible={!!id && notes.length > 0 && !!note}
			onChange={(state) => (ref.current = state)}
		/>
	);
};
