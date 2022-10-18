import type { LexicalEditor, NodeKey } from "lexical";

import {
    $createParagraphNode,
    $getNodeByKey,
    $getRoot,
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    $isTextNode,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    INDENT_CONTENT_COMMAND,
    OUTDENT_CONTENT_COMMAND,
    REDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    UNDO_COMMAND
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import { IS_APPLE } from "shared/environment";

import {
    $createCodeNode,
    $isCodeNode,
    CODE_LANGUAGE_FRIENDLY_NAME_MAP,
    CODE_LANGUAGE_MAP,
    getLanguageFriendlyName
} from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
    $isListNode,
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    ListNode,
    REMOVE_LIST_COMMAND
} from "@lexical/list";
import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {
    $isDecoratorBlockNode
} from "@lexical/react/LexicalDecoratorBlockNode";
import {
    INSERT_HORIZONTAL_RULE_COMMAND
} from "@lexical/react/LexicalHorizontalRuleNode";
import {
    $createHeadingNode,
    $createQuoteNode,
    $isHeadingNode,
    HeadingTagType
} from "@lexical/rich-text";
import {
    $getSelectionStyleValueForProperty,
    $isParentElementRTL,
    $patchStyleText,
    $selectAll,
    $wrapNodes
} from "@lexical/selection";
import {
    $findMatchingParent,
    $getNearestBlockElementAncestorOrThrow,
    $getNearestNodeOfType,
    mergeRegister
} from "@lexical/utils";

import useModal from "../../hooks/useModal";
import catTypingGif from "../../images/cat-typing.gif";
import { $createStickyNode } from "../../nodes/StickyNode";
import ColorPicker from "../../ui/ColorPicker";
import DropDown, { DropDownItem } from "../../ui/DropDown";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { sanitizeUrl } from "../../utils/sanitizeUrl";
import { EmbedConfigs } from "../AutoEmbedPlugin";
import { INSERT_COLLAPSIBLE_COMMAND } from "../CollapsiblePlugin";
import { InsertEquationDialog } from "../EquationsPlugin";
import { INSERT_EXCALIDRAW_COMMAND } from "../ExcalidrawPlugin";
import {
    INSERT_IMAGE_COMMAND,
    InsertImageDialog,
    InsertImagePayload
} from "../ImagesPlugin";
import { InsertPollDialog } from "../PollPlugin";
import { InsertNewTableDialog, InsertTableDialog } from "../TablePlugin";

const blockTypeToBlockName = {
	bullet: "Bulleted List",
	check: "Check List",
	code: "Code Block",
	h1: "Heading 1",
	h2: "Heading 2",
	h3: "Heading 3",
	h4: "Heading 4",
	h5: "Heading 5",
	h6: "Heading 6",
	number: "Numbered List",
	paragraph: "Normal",
	quote: "Quote",
};

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

const FONT_FAMILY_OPTIONS: [string, string][] = [
	["Arial", "Arial"],
	["Courier New", "Courier New"],
	["Georgia", "Georgia"],
	["Times New Roman", "Times New Roman"],
	["Trebuchet MS", "Trebuchet MS"],
	["Verdana", "Verdana"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
	["10px", "10px"],
	["11px", "11px"],
	["12px", "12px"],
	["13px", "13px"],
	["14px", "14px"],
	["15px", "15px"],
	["16px", "16px"],
	["17px", "17px"],
	["18px", "18px"],
	["19px", "19px"],
	["20px", "20px"],
];

function getCodeLanguageOptions(): [string, string][] {
	const options: [string, string][] = [];

	for (const [lang, friendlyName] of Object.entries(
		CODE_LANGUAGE_FRIENDLY_NAME_MAP
	)) {
		options.push([lang, friendlyName]);
	}

	return options;
}

const formatParagraph = () => {
	if (blockType !== "paragraph") {
		editor.update(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				$wrapNodes(selection, () => $createParagraphNode());
			}
		});
	}
};

const formatHeading = (headingSize: HeadingTagType) => {
	if (blockType !== headingSize) {
		editor.update(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				$wrapNodes(selection, () => $createHeadingNode(headingSize));
			}
		});
	}
};

const formatBulletList = () => {
	if (blockType !== "bullet") {
		editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
	} else {
		editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
	}
};

const formatCheckList = () => {
	if (blockType !== "check") {
		editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
	} else {
		editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
	}
};

const formatNumberedList = () => {
	if (blockType !== "number") {
		editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
	} else {
		editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
	}
};

const formatQuote = () => {
	if (blockType !== "quote") {
		editor.update(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				$wrapNodes(selection, () => $createQuoteNode());
			}
		});
	}
};

const formatCode = () => {
	if (blockType !== "code") {
		editor.update(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				if (selection.isCollapsed()) {
					$wrapNodes(selection, () => $createCodeNode());
				} else {
					const textContent = selection.getTextContent();
					const codeNode = $createCodeNode();
					selection.insertNodes([codeNode]);
					selection.insertRawText(textContent);
				}
			}
		});
	}
};
