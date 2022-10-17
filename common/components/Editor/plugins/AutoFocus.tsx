// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you

import { useEffect } from "react";

import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";

// actually use them.
export default function AutoFocusPlugin() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		// Focus the editor when the effect fires!
		editor.focus();
	}, [editor]);

	return null;
}
