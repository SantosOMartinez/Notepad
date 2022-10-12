import { Editor, Text } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";

export default function handleList(editor: Editor, key: string) {
	exitList(editor, key);
}

export const exitList = (editor: Editor, key: string) => {
	//TODO: Implement list behavior to enter or exit.
};
