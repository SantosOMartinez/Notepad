import { usePopoverState } from "ariakit/popover";
import {
    SelectItem as BaseSelectItem,
    SelectItemOptions,
    SelectList,
    useSelectState
} from "ariakit/select";
import cn from "classnames";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { HTMLAttributes, useEffect } from "react";

import Icon from "@components/Icon";
import { Popover, PopoverDisclosure } from "@components/Menu";
import TextStyle from "@components/TextStyle";
import { Annotations, ElementType as Type } from "@type/editor";

import styles from "./format.module.css";
import formatBlock from "./formatBlock";
import useFormatUpdate from "./useFormatUpdate";

const options = [
	{ value: Type.Title, name: "Title" },
	{ value: Type.Heading, name: "Heading" },
	{ value: Type.Subheading, name: "Subheading" },
	{ value: Type.Body, name: "Body" },
	{ value: Type.Monospaced, name: "Monospaced" },
	{ value: Type.BulletedList, name: "• Bulleted List" },
	{ value: Type.DashedList, name: "- Dashed List" },
	{ value: Type.NumberedList, name: "1. Numbered List" },
];

export default () => {
	const popover = usePopoverState({ animated: true });
	return (
		<>
			<PopoverDisclosure state={popover} icon="format" />
			<Popover state={popover} portal>
				<FormatContext onSelect={popover.toggle} />
			</Popover>
		</>
	);
};

interface SelectItemProps
	extends HTMLAttributes<HTMLDivElement>,
		SelectItemOptions {
	selected?: boolean;
}

const SelectItem = ({ selected, children, ...props }: SelectItemProps) => (
	<BaseSelectItem
		className={cn(styles.item, {
			[styles.selected]: selected,
		})}
		{...props}
	>
		<Icon icon="checkmark" className={styles.checkmark} />
		{children}
	</BaseSelectItem>
);

interface FormatContextProps {
	onSelect?: () => void;
	defaultValue?: Type;
	defaultAnnotations?: Annotations;
}

export const FormatContext = ({
	onSelect = () => {},
	defaultValue = Type.Body,
}: FormatContextProps) => {
	const select = useSelectState({
		defaultValue,
		open: true,
	});

	const { bold, italic, strikethrough, underline, activeEditor, editable } =
		useFormatUpdate(select);

	const annotations: Annotations = {
		bold,
		italic,
		strikethrough,
		underline,
	};

	const events = {
		onBold: () => activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold"),
		onItalic: () =>
			activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic"),
		onUnderline: () =>
			activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline"),
		onStrikethrough: () =>
			activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough"),
	};

	return (
		<div className={styles.container}>
			<TextStyle annotations={annotations} {...events} />
			<SelectList
				state={select}
				className={styles.list}
				disabled={!editable}
			>
				{options.map(({ value, name }, i) => (
					<SelectItem
						selected={select.value === value}
						value={value}
						key={i}
						onClick={onSelect}
					>
						{name}
					</SelectItem>
				))}
			</SelectList>
		</div>
	);
};
