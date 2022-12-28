import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    $setSelection,
    LexicalCommand,
    LexicalEditor,
    LexicalNode
} from "lexical";

import {
    $isListNode,
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND
} from "@lexical/list";
import { $createHeadingNode } from "@lexical/rich-text";
import { $wrapNodes } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import { ElementType as Type, HeadingType } from "@type/editor";

import {
    $createMonospacedNode
} from "../../../../components/Editor/Nodes/MonoscapedNode";

const headingSizes = {
	[HeadingType.Title]: "h1" as const,
	[HeadingType.Heading]: "h2" as const,
	[HeadingType.Subheading]: "h3" as const,
};

export const formatParagraph = (editor: LexicalEditor) => {
	editor.update(() => {
		const selection = $getSelection();

		if ($isRangeSelection(selection)) {
			$wrapNodes(selection, () => $createParagraphNode());
		}
	});
};

export const formatMonoscaped = (editor: LexicalEditor) => {
	editor.update(() => {
		const selection = $getSelection();

		if ($isRangeSelection(selection)) {
			$wrapNodes(selection, () => $createMonospacedNode());
		}
	});
};

export const formatHeading = (
	editor: LexicalEditor,
	headingSize: HeadingType
) => {
	editor.update(() => {
		const selection = $getSelection();

		if ($isRangeSelection(selection)) {
			$wrapNodes(selection, () =>
				$createHeadingNode(headingSizes[headingSize])
			);
		}
	});
};

const getElement = () => {
	const selection = $getSelection();
	let element: LexicalNode = null;

	if ($isRangeSelection(selection)) {
		const anchorNode = selection.anchor.getNode();
		element =
			anchorNode.getKey() === "root"
				? anchorNode
				: $findMatchingParent(anchorNode, (e) => {
						const parent = e.getParent();
						return parent !== null && $isRootOrShadowRoot(parent);
				  });

		if (element === null) {
			element = anchorNode.getTopLevelElementOrThrow();
		}
	}
	return element;
};

export const formatBulletList = (editor: LexicalEditor) =>
	editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);

export const formatCheckList = (editor: LexicalEditor) =>
	editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);

export const formatNumberedList = (editor: LexicalEditor) =>
	editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);

export default function formatBlock(editor: LexicalEditor, blockType: Type) {
	switch (blockType) {
		case Type.Title:
			return formatHeading(editor, HeadingType.Title);
		case Type.Heading:
			return formatHeading(editor, HeadingType.Heading);
		case Type.Subheading:
			return formatHeading(editor, HeadingType.Subheading);
		case Type.Body:
			return formatParagraph(editor);
		case Type.Monospaced:
			return formatMonoscaped(editor);
		case Type.BulletedList:
			return formatBulletList(editor);
		case Type.DashedList:
			return formatBulletList(editor);
		case Type.CheckedList:
			return formatCheckList(editor);
		case Type.NumberedList:
			return formatNumberedList(editor);
	}
}
