import cn from "classnames";
import { useState } from "react";
import { BaseEditor, createEditor, Descendant } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import { formatDate } from "@functions/date";
import { BlockStyle } from "@type/text";

import styles from "./editor.module.css";

type CustomElement = {
	type: BlockStyle;
	children: CustomText[];
};
type CustomText = { text: string };
declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

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
		type: BlockStyle.Body,
		children: [{ text: "A line of text in a paragraph." }],
	},
];

export default ({ date = new Date() }: Props) => {
	const [editor] = useState(() => withReact(createEditor()));

	const timestamp = format(date);

	return (
		<div className={styles.container}>
			<p className={styles.date}>{timestamp}</p>
			<Slate editor={editor} value={initialValue}>
				<Editable className={styles.editor} />
			</Slate>
		</div>
	);
};
