import {
    Toolbar,
    ToolbarItem,
    ToolbarItemOptions,
    useToolbarState
} from "ariakit/toolbar";
import cn from "classnames";
import { HTMLAttributes } from "react";

import Icon from "@components/Icon";
import { Annotations } from "@type/editor/element";
import { IconName } from "@type/icons";

import styles from "./textStyle.module.css";

interface ItemProps
	extends HTMLAttributes<HTMLButtonElement>,
		ToolbarItemOptions {
	icon?: IconName;
	active?: boolean;
}

const Item = ({ icon, children, active, ...props }: ItemProps) => {
	return (
		<ToolbarItem
			className={cn(styles.item, { [styles.active]: active })}
			{...props}
		>
			{icon && <Icon icon={icon} />}
			{children && <p>{children}</p>}
		</ToolbarItem>
	);
};

interface Props {
	annotations?: Annotations;
	onBold?: () => void;
	onItalic?: () => void;
	onUnderline?: () => void;
	onStrikethrough?: () => void;
}

export default ({ annotations, ...events }: Props) => {
	const toolbar = useToolbarState();

	const { bold, italic, underline, strikethrough } = annotations;
	const {
		onBold = () => {},
		onItalic = () => {},
		onUnderline = () => {},
		onStrikethrough = () => {},
	} = events;

	return (
		<Toolbar state={toolbar} className={styles.toolbar}>
			<Item icon="bold" active={bold} onClick={onBold} />
			<Item icon="italic" active={italic} onClick={onItalic} />
			<Item icon="underline" active={underline} onClick={onUnderline} />
			<Item
				icon="strikethrough"
				active={strikethrough}
				onClick={onStrikethrough}
			/>
		</Toolbar>
	);
};
