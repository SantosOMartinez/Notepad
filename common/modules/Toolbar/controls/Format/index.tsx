import { usePopoverState } from "ariakit/popover";
import {
    SelectItem as BaseSelectItem,
    SelectItemOptions,
    SelectList,
    useSelectState
} from "ariakit/select";
import cn from "classnames";
import { HTMLAttributes, useEffect, useState } from "react";

import Icon from "@components/Icon";
import { Popover, PopoverDisclosure } from "@components/Menu";
import TextStyle from "@components/TextStyle";
import { Annotations, TextType } from "@type/text";

import styles from "./format.module.css";

const options = Object.values(TextType);

const baseAnnotations = {
	bold: false,
	italic: false,
	underline: false,
	strikethrough: false,
};

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
	defaultValue?: TextType;
	defaultAnnotations?: Annotations;
}

export const FormatContext = ({
	onSelect = () => {},
	defaultValue = TextType.Body,
	defaultAnnotations = baseAnnotations,
}: FormatContextProps) => {
	const select = useSelectState({
		defaultValue,
		open: true,
	});

	useEffect(() => onSelect(), [select.value]);

	const [annotations, setAnnotations] = useState(defaultAnnotations);

	const events = {
		onBold: () => setAnnotations((s) => ({ ...s, bold: !s.bold })),
		onItalic: () => setAnnotations((s) => ({ ...s, italic: !s.italic })),
		onUnderline: () =>
			setAnnotations((s) => ({ ...s, underline: !s.underline })),
		onStrikethrough: () =>
			setAnnotations((s) => ({ ...s, strikethrough: !s.strikethrough })),
	};

	return (
		<div className={styles.container}>
			<TextStyle annotations={annotations} {...events} />
			<SelectList state={select} className={styles.list}>
				{options.map((value, i) => (
					<SelectItem
						selected={select.value === value}
						value={value}
						key={i}
					>
						{value}
					</SelectItem>
				))}
			</SelectList>
		</div>
	);
};
