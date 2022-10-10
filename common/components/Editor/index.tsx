import { KeyboardEvent, useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import {
    Editable,
    RenderElementProps,
    RenderLeafProps,
    Slate,
    withReact
} from "slate-react";

import { formatDate } from "@functions/date";
import { TextType } from "@type/text";

import { Element, Leaf } from "./Block";
import styles from "./editor.module.css";

interface Props {
	date?: Date;
}

const format = (date: Date) =>
	formatDate(date, "en-us", {
		dateStyle: "full",
		hour12: true,
		timeStyle: "short",
	});

const initialValue: Descendant[] = [
	{
		type: TextType.Title,
		children: [{ text: "Apple Notes " }],
	},
	{
		type: TextType.Body,
		children: [
			{ text: "This is a " },
			{ text: "recreation", annotations: { bold: true } },
			{ text: " of " },

			{
				text: "Apple Notes",
				link: {
					url: "https://apps.apple.com/us/app/notes/id1110145109",
				},
			},
			{ text: " on the " },
			{ text: "web", annotations: { underline: true } },
			{ text: "." },
		],
	},
	{
		type: TextType.DashedList,
		children: [
			{ text: "Dashed List", annotations: { strikethrough: true } },
		],
	},
	{
		type: TextType.BulletedList,
		children: [
			{ text: "Bullet " },
			{ text: "List", annotations: { underline: true } },
		],
	},
	{
		type: TextType.NumberedList,
		children: [
			{ text: "Number " },
			{ text: "List", annotations: { bold: true, underline: true } },
		],
	},
];

export default ({ date = new Date() }: Props) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	const timestamp = format(date);

	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const key = e.key;

		if (key === "Tab") {
			e.preventDefault();
			editor.insertText("\t");
			return;
		}
	};

	// TODO: Add support for list elements and their parent.

	return (
		<div className={styles.container}>
			<p className={styles.date}>{timestamp}</p>
			<Slate editor={editor} value={initialValue}>
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
