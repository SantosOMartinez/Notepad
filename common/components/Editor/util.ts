import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { EditorConfig } from "@type/editor";

import { MonospacedNode } from "./Nodes/MonoscapedNode";
import theme from "./theme";

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
		MonospacedNode,
		HeadingNode,
	],
};
