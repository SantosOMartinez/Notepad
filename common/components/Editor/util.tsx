import imageExtensions from "image-extensions";
import isUrl from "is-url";
import {
    CustomTypes,
    Editor,
    Node as N,
    Point,
    Range,
    Text,
    Transforms
} from "slate";
import { jsx } from "slate-hyperscript";

import { ElementType, HelperType, TextElement, TextType } from "@type/text";

const LIST_TYPES: ElementType[] = [
	TextType.BulletedList,
	TextType.DashedList,
	TextType.NumberedList,
];

const ELEMENT_TAGS = {
	A: (el) => ({ type: "link", url: el.getAttribute("href") }),
	BLOCKQUOTE: () => ({ type: "quote" }),
	H1: () => ({ type: "heading-one" }),
	H2: () => ({ type: "heading-two" }),
	H3: () => ({ type: "heading-three" }),
	H4: () => ({ type: "heading-four" }),
	H5: () => ({ type: "heading-five" }),
	H6: () => ({ type: "heading-six" }),
	IMG: (el) => ({ type: "image", url: el.getAttribute("src") }),
	LI: () => ({ type: "list-item" }),
	OL: () => ({ type: "numbered-list" }),
	P: () => ({ type: "paragraph" }),
	PRE: () => ({ type: "code" }),
	UL: () => ({ type: "bulleted-list" }),
	TABLE: () => ({ type: "table" }),
	TBODY: () => ({ type: "tbody" }),
	THEAD: () => ({ type: "thead" }),
	TR: () => ({ type: "table-row" }),
	TD: () => ({ type: "table-cell" }),
	TH: () => ({ type: "table-cell-header" }),
	HEADER: () => ({ type: "header" }),
	SECTION: () => ({ type: "section" }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
	CODE: () => ({ code: true }),
	DEL: () => ({ strikethrough: true }),
	EM: () => ({ italic: true }),
	I: () => ({ italic: true }),
	S: () => ({ strikethrough: true }),
	STRONG: () => ({ bold: true }),
	U: () => ({ underline: true }),
};

export const deserialize = (el: Node, mAttrs = {}) => {
	console.log("deserialize:", el, el.nodeType, el.nodeName);
	if (el.nodeType === 3) {
		return el.textContent;
	} else if (el.nodeType !== 1) {
		return null;
	} else if (el.nodeName === "BR") {
		return "\n";
	}

	const { nodeName } = el;
	let parent = el;

	if (el.childNodes[0]) {
		console.log(
			"deserialize:sub",
			el.childNodes[0],
			el.childNodes[0].nodeName
		);
	}
	let children = [];
	if (nodeName === "PRE") {
		if (el.childNodes[0] && el.childNodes[0].nodeName === "CODE") {
			parent = el.childNodes[0];
		}
		console.log("deserialize:pre:", parent, parent.childNodes);
		children = Array.from(parent.childNodes).map((e) => {
			return {
				text: e.textContent,
				code: true,
			};
		});
	} else {
		children = Array.from(parent.childNodes).map(deserialize).flat();
	}

	if (el.nodeName === "BODY") {
		return jsx("fragment", {}, children);
	}

	if (ELEMENT_TAGS[nodeName]) {
		const attrs = ELEMENT_TAGS[nodeName](el);

		return jsx("element", attrs, children);
	}

	if (TEXT_TAGS[nodeName]) {
		const attrs = TEXT_TAGS[nodeName](el);
		return children.map((child) => jsx("text", attrs, child));
	}

	return children;
};

const fnRemoteImage = (editor, files) => {
	for (const file of files) {
		const [mime] = file.type.split("/");
		if (mime === "image") {
			const formData = new FormData();
			formData.append("image", file);
			fetch("/api/note/upload", {
				method: "POST",
				body: formData,
			})
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					insertImage(editor, result.data.uri);
				});
		}
	}
};

export const withImages = (editor) => {
	const { insertData, isVoid } = editor;

	editor.isVoid = (element) => {
		return element.type === "image" ? true : isVoid(element);
	};

	editor.insertData = (data) => {
		const text = data.getData("text/plain");
		const { files } = data;
		console.log("insertData:", files);
		if (files && files.length > 0) {
			fnRemoteImage(editor, files);
		} else if (isImageUrl(text)) {
			insertImage(editor, text);
		} else {
			insertData(data);
		}
	};

	return editor;
};

export const isImageUrl = (url) => {
	if (!url) return false;
	if (!isUrl(url)) return false;
	const ext = new URL(url).pathname.split(".").pop();
	return imageExtensions.includes(ext);
};

const insertImage = (editor, url) => {
	const text = { text: "" };
	const image = { type: HelperType.Image, url, children: [text] };
	Transforms.insertNodes(editor, image);
};

export const withTables = (editor) => {
	const { deleteBackward, deleteForward, insertBreak } = editor;

	editor.deleteBackward = (unit) => {
		const { selection } = editor;

		if (selection && Range.isCollapsed(selection)) {
			const [cell] = Editor.nodes(editor, {
				match: (n: TextElement) => n.type === HelperType.TCell,
			});

			if (cell) {
				const [, cellPath] = cell;
				const start = Editor.start(editor, cellPath);

				if (Point.equals(selection.anchor, start)) {
					return;
				}
			}
		}

		deleteBackward(unit);
	};

	editor.deleteForward = (unit) => {
		const { selection } = editor;

		if (selection && Range.isCollapsed(selection)) {
			const [cell] = Editor.nodes(editor, {
				match: (n: TextElement) => n.type === HelperType.TCell,
			});

			if (cell) {
				const [, cellPath] = cell;
				const end = Editor.end(editor, cellPath);

				if (Point.equals(selection.anchor, end)) {
					return;
				}
			}
		}

		deleteForward(unit);
	};

	editor.insertBreak = () => {
		const { selection } = editor;

		if (selection) {
			const [table] = Editor.nodes(editor, {
				match: (n: TextElement) => n.type === HelperType.Table,
			});

			if (table) {
				return;
			}
		}

		insertBreak();
	};

	return editor;
};

export const withHtml = (editor) => {
	const { insertData, isInline, isVoid } = editor;

	editor.isInline = (element: TextElement) => {
		return isInline(element);
	};

	editor.isVoid = (element) => {
		return element.type === HelperType.Image ? true : isVoid(element);
	};

	editor.insertData = (data) => {
		const html = data.getData("text/html");

		if (html) {
			const parsed = new DOMParser().parseFromString(html, "text/html");
			const fragment = deserialize(parsed.body);
			Transforms.insertFragment(editor, fragment as N[]);
			return;
		}

		insertData(data);
	};

	return editor;
};

export const toggleBlock = (editor: CustomTypes["Editor"], format) => {
	const isActive = isBlockActive(editor, format);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n: TextElement) => LIST_TYPES.includes(n.type),
		split: true,
	});

	Transforms.setNodes(editor, {
		type: isActive ? TextType.Body : isList ? HelperType.ListItem : format,
	});

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

export const toggleMark = (editor: CustomTypes["Editor"], format) => {
	//TODO: Implement annotation toggle.
	Transforms.setNodes(
		editor,
		{
			annotations: { [format]: true },
		},
		{
			match: (n) => Text.isText(n),
			split: true,
		}
	);
};

export const isBlockActive = (editor: CustomTypes["Editor"], format) => {
	const [match] = Editor.nodes(editor, {
		match: (n: TextElement) => n.type === format,
	});
	return !!match;
};

export const isMarkActive = (editor: CustomTypes["Editor"], format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};
