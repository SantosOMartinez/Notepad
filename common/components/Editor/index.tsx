import isHotkey from "is-hotkey";
import {
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

import { formatDate } from "@functions/date";
import { ElementType as Type } from "@type/editor";

import { Element, Leaf } from "./Block";
import styles from "./editor.module.css";
import { toggleMark, withHtml, withImages, withTables } from "./util";

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
		type: Type.Title,
		children: [{ text: "Apple Notes " }],
	},
	{
		type: Type.Body,
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
		type: Type.DashedList,
		children: [
			{ text: "Dashed List", annotations: { strikethrough: true } },
		],
	},
	{
		type: Type.BulletedList,
		children: [
			{ text: "Bullet " },
			{ text: "List", annotations: { underline: true } },
		],
	},
	{
		type: Type.NumberedList,
		children: [
			{ text: "Number " },
			{ text: "List", annotations: { bold: true, underline: true } },
		],
	},
];

const HOTKEYS = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+s": "strikethrough",
};

export default ({ date = new Date() }: Props) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const [content, setContent] = useState(initialValue);

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
				const mark = HOTKEYS[hotkey];
				toggleMark(editor, mark);
			}
		}
	};

	// TODO: Add support for list elements and their parent.
	editor.children = content;
	return (
		<div className={styles.container}>
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
