import cn from "classnames";
import isHotkey from "is-hotkey";
import { KeyboardEvent, useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import { formatDate } from "@functions/date";
import { initialDocument } from "@mockup/editor";

import { Element, Leaf } from "./Block";
import styles from "./editor.module.css";
import { toggleMark, withImages, withTables } from "./util";

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

const HOTKEYS = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+s": "strikethrough",
};

export default ({ date = new Date(), visible = true }: Props) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const [content, setContent] = useState(initialDocument);

	const editor = useMemo(
		() => withImages(withTables(withReact(withHistory(createEditor())))),
		[]
	);

	const timestamp = format(date);

	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const key = e.key;

		if (key === "Tab") {
			e.preventDefault();
			editor.insertText("\t");
			return;
		}

		for (const hotkey in HOTKEYS) {
			if (isHotkey(hotkey, e)) {
				e.preventDefault();
				const annotation = HOTKEYS[hotkey];
				toggleMark(editor, annotation);
			}
		}
	};

	// TODO: Add support for list elements and their parent.
	editor.children = content;
	return (
		<div className={cn(styles.container, { [styles.visible]: visible })}>
			<p className={styles.date}>{timestamp}</p>
			<Slate
				editor={editor}
				value={content}
				onChange={(newValue) => setContent(newValue)}
			>
				<Editable
					spellCheck
					className={styles.editor}
					onKeyDown={onKeyDown}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
				/>
			</Slate>
		</div>
	);
};
