import cn from "classnames";
import { EditorState, LexicalEditor } from "lexical";

import { formatDate } from "@functions/date";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

import styles from "./editor.module.css";
import AutoFocusPlugin from "./plugins/AutoFocus";
import AutoLinkPlugin from "./plugins/AutoLink";
import TabInsertPlugin from "./plugins/TabInsert";

interface Props {
	date?: Date;
	visible?: boolean;
	onChange?: (editorState: EditorState, editor: LexicalEditor) => void;
}

const format = (date: Date) =>
	formatDate(date, "en-us", {
		dateStyle: "full",
		hour12: true,
		timeStyle: "short",
	});

export default ({
	date = new Date(),
	visible = true,
	onChange = () => {},
}: Props) => {
	const timestamp = format(date);

	if (!visible) return <h6 className={styles.empty}>No Message Selected</h6>;

	return (
		<div className={cn(styles.container, { [styles.visible]: visible })}>
			<p className={styles.date}>{timestamp}</p>
			<RichTextPlugin
				contentEditable={<ContentEditable className={styles.editor} />}
				placeholder={""}
			/>
			<HistoryPlugin />
			<AutoFocusPlugin />
			<ListPlugin />
			<LinkPlugin />
			<OnChangePlugin onChange={onChange} />
			<CheckListPlugin />
			<TablePlugin />
			<AutoLinkPlugin />
			<TabInsertPlugin />
		</div>
	);
};
