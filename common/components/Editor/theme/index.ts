import { EditorThemeClasses } from "lexical";

import styles from "./theme.module.css";

export default {
	code: styles.code,
	link: styles.link,
	heading: {
		h1: styles.h1,
		h2: styles.h2,
		h3: styles.h3,
		h4: styles.h4,
		h5: styles.h5,
		h6: styles.h6,
	},
	paragraph: styles.paragraph,
	image: styles.image,
	table: styles.table,
	text: {
		base: styles.base,
		bold: styles.bold,
		code: styles.textCode,
		italic: styles.italic,
		strikethrough: styles.strikethrough,
		subscript: styles.subscript,
		superscript: styles.superscript,
		underline: styles.underline,
		underlineStrikethrough: styles.underlineStrikethrough,
	},
} as EditorThemeClasses;
