import { $getSelection, COMMAND_PRIORITY_HIGH, KEY_TAB_COMMAND } from "lexical";
import { useEffect } from "react";

import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";

export default function TabInsertPlugin() {
	const [editor] = useLexicalComposerContext();

	const onTab = (event: KeyboardEvent) => {
		event.preventDefault();
		$getSelection().insertRawText("\t");
		return true;
	};

	useEffect(() => {
		editor.registerCommand(KEY_TAB_COMMAND, onTab, COMMAND_PRIORITY_HIGH);
	}, []);

	return null;
}
