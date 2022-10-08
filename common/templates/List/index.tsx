import cn from "classnames";
import { HTMLAttributes } from "react";

import Item from "@components/ListItem";
import Note from "@type/note";

import styles from "./list.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
	list?: Note[];
	active?: string;
}

export default ({ active, list = [], className, ...props }: Props) => {
	const isEmpty = list.length === 0;

	return (
		<nav
			className={cn(styles.list, className, { [styles.none]: isEmpty })}
			{...props}
		>
			{!isEmpty ? (
				list.map((p, i) => (
					<Item key={i} {...p} active={active === p.id} />
				))
			) : (
				<h6 className={styles.empty}>No Notes</h6>
			)}
		</nav>
	);
};
