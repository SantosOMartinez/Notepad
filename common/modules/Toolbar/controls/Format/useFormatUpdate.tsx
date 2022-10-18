import { SelectState } from "ariakit";
import {
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    COMMAND_PRIORITY_EDITOR,
    INSERT_PARAGRAPH_COMMAND,
    SELECTION_CHANGE_COMMAND
} from "lexical";
import { useCallback, useEffect, useState } from "react";

import { $isListNode, ListNode, REMOVE_LIST_COMMAND } from "@lexical/list";
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";
import {
    $findMatchingParent,
    $getNearestNodeOfType,
    mergeRegister
} from "@lexical/utils";
import { ElementType as Type, ListType } from "@type/editor";

import formatBlock, { formatParagraph } from "./formatBlock";

const listTypes = {
	bullet: ListType.BulletedList,
	check: ListType.CheckedList,
	number: ListType.NumberedList,
};

const blockTypeToName = {
	bullet: Type.BulletedList,
	check: Type.CheckedList,
	h1: Type.Title,
	h2: Type.Heading,
	h3: Type.Subheading,
	number: Type.Subheading,
	paragraph: Type.Body,
	monospaced: Type.Monospaced,
	dashed: Type.DashedList,
};

export default function useFormatUpdate(select: SelectState<Type>) {
	const [editor] = useLexicalComposerContext();
	const [activeEditor, setActiveEditor] = useState(editor);
	const [bold, setBold] = useState(false);
	const [italic, setItalic] = useState(false);
	const [underline, setUnderline] = useState(false);
	const [strikethrough, setStrikethrough] = useState(false);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [editable, setEditable] = useState(() => editor.isEditable());

	const updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			const anchorNode = selection.anchor.getNode();
			let element =
				anchorNode.getKey() === "root"
					? anchorNode
					: $findMatchingParent(anchorNode, (e) => {
							const parent = e.getParent();
							return (
								parent !== null && $isRootOrShadowRoot(parent)
							);
					  });

			if (element === null) {
				element = anchorNode.getTopLevelElementOrThrow();
			}

			const elementKey = element.getKey();
			const elementDOM = activeEditor.getElementByKey(elementKey);

			// Update text format
			setBold(selection.hasFormat("bold"));
			setItalic(selection.hasFormat("italic"));
			setUnderline(selection.hasFormat("underline"));
			setStrikethrough(selection.hasFormat("strikethrough"));

			if (elementDOM !== null) {
				if ($isListNode(element)) {
					const parentList = $getNearestNodeOfType<ListNode>(
						anchorNode,
						ListNode
					);
					const type = parentList
						? parentList.getListType()
						: element.getListType();

					if (type === undefined) return;

					select.setValue(listTypes[type]);
				} else {
					const type = $isHeadingNode(element)
						? element.getTag()
						: element.getType();

					if (type in blockTypeToName) {
						select.setValue(blockTypeToName[type]);
					}
				}
			}
		}
	}, [activeEditor]);

	useEffect(() => {
		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			(_payload, newEditor) => {
				updateToolbar();
				setActiveEditor(newEditor);
				return false;
			},
			COMMAND_PRIORITY_CRITICAL
		);
	}, [editor, updateToolbar]);

	useEffect(() => {
		return mergeRegister(
			editor.registerEditableListener((editable) => {
				setEditable(editable);
			}),
			activeEditor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateToolbar();
				});
			}),
			activeEditor.registerCommand<boolean>(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			),
			activeEditor.registerCommand<boolean>(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL
			)
		);
	}, [activeEditor, editor, updateToolbar]);

	return {
		bold,
		italic,
		underline,
		strikethrough,
		canUndo,
		canRedo,
		editable,
		activeEditor,
	};
}
