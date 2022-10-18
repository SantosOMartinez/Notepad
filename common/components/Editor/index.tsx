import cn from "classnames";
import { EditorState } from "lexical";
import { useRef } from "react";

import { formatDate } from "@functions/date";
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

import styles from "./editor.module.css";
import AutoFocusPlugin from "./plugins/AutoFocus";
import { initialConfig, MATCHERS } from "./util";

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
