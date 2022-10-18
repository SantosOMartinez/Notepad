import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { EditorConfig } from "@type/editor";

import theme from "./theme";

export const URL_MATCHER =
	/((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const MATCHERS = [
	(text) => {
		const match = URL_MATCHER.exec(text);
		return (
			match && {
				index: match.index,
				length: match[0].length,
				text: match[0],
				url: match[0],
			}
		);
	},
];

export const initialConfig: EditorConfig = {
	namespace: "Notepad",
	theme,
	onError: (error) => console.log(error),
	editorState: null,
	nodes: [
		ListNode,
		ListItemNode,
		LinkNode,
		AutoLinkNode,
		TableNode,
		TableCellNode,
		TableRowNode,
		CodeNode,
	],
};
