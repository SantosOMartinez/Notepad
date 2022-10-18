import cn from "classnames";
import { useRouter } from "next/router";
import { HTMLAttributes, useEffect } from "react";
import { useRecoilValue } from "recoil";

import Item from "@components/ListItem";
import useRefreshNotes from "@hooks/useRefreshNotes";
import { locationState, noteListState, noteState } from "@state/toolbar";

import styles from "./list.module.css";

interface Props extends HTMLAttributes<HTMLElement> {
	active?: string;
}

export default ({ className, ...props }: Props) => {
	const list = useRecoilValue(noteListState);
	const isEmpty = list.length === 0;
	const location = useRecoilValue(locationState);
	const note = useRecoilValue(noteState);

	useRefreshNotes();

	return (
		<nav
			className={cn(styles.list, className, { [styles.none]: isEmpty })}
			{...props}
		>
			{!isEmpty ? (
				list
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
