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
import { BlockStyle } from "@type/text";

import styles from "./format.module.css";

const options = Object.values(BlockStyle);

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
}

export const FormatContext = ({ onSelect = () => {} }: FormatContextProps) => {
	const select = useSelectState({
		defaultValue: BlockStyle.Body,
		open: true,
	});

	useEffect(() => onSelect(), [select.value]);

	const [bold, setBold] = useState(false);
	const [italic, setItalic] = useState(false);
	const [underline, setUnderline] = useState(false);
	const [strikethrough, setStrikethrough] = useState(false);

	const state = {
		bold,
		italic,
		underline,
		strikethrough,
	};

	const events = {
		onBold: () => setBold((s) => !s),
		onItalic: () => setItalic((s) => !s),
		onUnderline: () => setUnderline((s) => !s),
		onStrikethrough: () => setStrikethrough((s) => !s),
	};

	return (
		<div className={styles.container}>
			<TextStyle {...state} {...events} />
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
