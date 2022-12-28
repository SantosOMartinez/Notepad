import { usePopoverState } from "ariakit/popover";
import {
    $getSelection,
    $isRangeSelection,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_CRITICAL,
    SELECTION_CHANGE_COMMAND
} from "lexical";
import { useCallback, useEffect, useState } from "react";

import { Popover, PopoverDisclosure } from "@components/Menu";
import { getSelectedNode } from "@functions/editor";
import sanitizeUrl from "@functions/sanitizeUrl";
import { useBrowserName } from "@hooks/useBrowserName";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
    useLexicalComposerContext
} from "@lexical/react/LexicalComposerContext";
import {
    $findMatchingParent,
    $getNearestBlockElementAncestorOrThrow,
    $getNearestNodeOfType,
    mergeRegister
} from "@lexical/utils";

import styles from "./link.module.css";

const exampleSite = {
	title: "Notes on the App Store",
	url: "https://apps.apple.com/us/app/notes/id1110145109",
	thumbnail:
		"https://is5-ssl.mzstatic.com/image/thumb/Purple112/v4/f0/e0/7e/f0e07e01-0a36-0ee3-edea-5f0e28cac5db/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x600wa.png",
};

export default (props) => {
	const popover = usePopoverState({ animated: true });
	const [editor] = useLexicalComposerContext();
	const [activeEditor, setActiveEditor] = useState(editor);

	const [isLink, setIsLink] = useState(false);

	const browser = useBrowserName();

	const { title, thumbnail } = exampleSite;

	const updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			// Update links
			const node = getSelectedNode(selection);
			const parent = node.getParent();
			if ($isLinkNode(parent) || $isLinkNode(node)) {
				setIsLink(true);
			} else {
				setIsLink(false);
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
		return activeEditor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				updateToolbar();
			});
		});
	}, [activeEditor, editor, updateToolbar]);

	const insertLink = useCallback(() => {
		if (!isLink) {
			editor.dispatchCommand(
				TOGGLE_LINK_COMMAND,
				sanitizeUrl("https://")
			);
		} else {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
		}
	}, [editor, isLink]);

	return (
		<div {...props}>
			<PopoverDisclosure state={popover} icon="link" />
			<Popover state={popover} portal>
				<p className={styles.header}>Add App Link</p>
				<div className={styles.link}>
					<img className={styles.img} src={thumbnail} />
					<div className={styles.text}>
						<p className={styles.title}>{title}</p>
						<p className={styles.description}>{browser}</p>
					</div>
					<button className={styles.button} onClick={insertLink}>
						Add Link
					</button>
				</div>
			</Popover>
		</div>
	);
};
