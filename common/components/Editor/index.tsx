import cn from "classnames";
import { EditorState } from "lexical";
import { useRef } from "react";

import { formatDate } from "@functions/date";
import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { EditorConfig } from "@type/editor";

import styles from "./editor.module.css";
import AutoFocusPlugin from "./plugins/AutoFocus";
import theme from "./theme";

interface Props {
	date?: Date;
	visible?: boolean;
}

const format = (date: Date) =>
	formatDate(date, "en-us", {
		dateStyle: "full",
		hour12: true,
		timeStyle: "short",
	});

const initialConfig: EditorConfig = {
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

const URL_MATCHER =
	/((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
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

export default ({ date = new Date(), visible = true }: Props) => {
	const editorStateRef = useRef<EditorState>();
	const timestamp = format(date);

	const onChange = (editorState) => (editorStateRef.current = editorState);

	return (
		<div className={cn(styles.container, { [styles.visible]: visible })}>
			<p className={styles.date}>{timestamp}</p>
			<LexicalComposer initialConfig={initialConfig}>
				<RichTextPlugin
					contentEditable={
						<ContentEditable className={styles.editor} />
					}
					placeholder={""}
				/>
				<OnChangePlugin onChange={onChange} />
				<HistoryPlugin />
				<AutoFocusPlugin />
				<ListPlugin />
				<LinkPlugin />
				<CheckListPlugin />
				<TablePlugin />
				<AutoLinkPlugin matchers={MATCHERS} />
			</LexicalComposer>
		</div>
	);
};
