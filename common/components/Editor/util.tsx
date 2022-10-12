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

import { ElementType as Type, TextElement } from "@type/editor";

const LIST_TYPES: Type[] = [
	Type.BulletedList,
	Type.DashedList,
	Type.NumberedList,
];

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
	const image = { type: Type.Media, url, children: [text] };
	Transforms.insertNodes(editor, image);
};

export const withTables = (editor) => {
	const { deleteBackward, deleteForward, insertBreak } = editor;

	editor.deleteBackward = (unit) => {
		const { selection } = editor;

		if (selection && Range.isCollapsed(selection)) {
			const [cell] = Editor.nodes(editor, {
				match: (n: TextElement) => n.type === Type.TCell,
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
				match: (n: TextElement) => n.type === Type.TCell,
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
				match: (n: TextElement) => n.type === Type.Table,
			});

			if (table) {
				return;
			}
		}

		insertBreak();
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
		type: isActive ? Type.Body : isList ? Type.ListItem : format,
	});

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

export const isAnnotationActive = (editor: Editor, format: keyof Text) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => Text.isText(n) && !!n[format],
		mode: "all",
	});
	return !!match;
};

export const toggleAnnotation = (editor: Editor, format: keyof Text) => {
	const isActive = isAnnotationActive(editor, format);
	Transforms.setNodes(
		editor,
		{ [format]: isActive ? null : true },
		{ match: Text.isText, split: true }
	);
};

export const isBlockActive = (editor: Editor, format) => {
	const [match] = Editor.nodes(editor, {
		match: (n: TextElement) => n.type === format,
	});
	return !!match;
};

// ------
export const isMarkActive = (
	editor: Editor,
	format: keyof Omit<Text, "text">
): boolean => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

export const toggleMark = (
	editor: Editor,
	format: keyof Omit<Text, "text">
): void => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};
