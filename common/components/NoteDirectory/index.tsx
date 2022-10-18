import cn from "classnames";
import { ButtonHTMLAttributes } from "react";

import Icon from "@components/Icon";
import { formatNumber } from "@functions/format";

import styles from "./noteDirectory.module.css";

export interface Directory {
	id: string | null;
	name: string;
	count?: number;
}

export interface Group {
	label: string;
	directories: Directory[];
}

interface CommonProps {
	onChange?: (id: string) => void;
	selected?: string;
}

interface Props extends CommonProps {
	groups?: Group[];
}

export default ({ selected, groups = [], onChange = () => {} }: Props) => (
	<>
		{groups.map((group, i) => (
			<Group
				key={i}
				group={group}
				onChange={onChange}
				selected={selected}
			/>
		))}
	</>
);

interface GroupProps extends CommonProps {
	group: Group;
}
const Group = ({
	group: { directories, label },
	onChange,
	selected,
}: GroupProps) => (
	<div className={styles.group}>
		<h6 className={styles.label}>{label}</h6>
		{directories.map((directory, i) => (
			<Item
				key={i}
				directory={directory}
				onClick={() => onChange(directory.id)}
				selected={directory.id === selected}
			/>
		))}
	</div>
);

interface ItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	directory: Directory;
	selected?: boolean;
}

const Item = ({
	selected,
	directory: { name, count = 0 },
	...props
}: ItemProps) => (
	<button
		className={cn(styles.item, { [styles.selected]: selected })}
		{...props}
	>
		<Icon className={styles.icon} icon="folder-line" />
		<span className={styles.name}>{name}</span>
		<span className={styles.count}>{formatNumber(count)}</span>
	</button>
);
