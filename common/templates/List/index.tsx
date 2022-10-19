import cn from "classnames";
import { HTMLAttributes, useEffect } from "react";
import { useRecoilValue } from "recoil";

import Item from "@components/ListItem";
import useNotes from "@hooks/useNotes";
import { locationState } from "@state/notes";

import styles from "./list.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
	active?: string;
}

export default ({ className, ...props }: Props) => {
	const { note, notes } = useNotes();
	const isEmpty = notes.length === 0;
	const location = useRecoilValue(locationState);

	return (
		<nav
			className={cn(styles.list, className, { [styles.none]: isEmpty })}
			{...props}
		>
			{!isEmpty ? (
				notes
					.filter((item) => item.location === location)
					.map((p, i) => (
						<Item key={i} {...p} active={note?.id === p.id} />
					))
			) : (
				<h6 className={styles.empty}>No Notes</h6>
			)}
		</nav>
	);
};
