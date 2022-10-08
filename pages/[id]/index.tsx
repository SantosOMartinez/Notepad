import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ListView from "@layouts/ListView";
import Settings from "@modules/Settings";
import List from "@templates/List";
import Note from "@type/note";

import styles from "./style.module.css";

export default () => {
	const router = useRouter();
	const { id } = router.query;
	const [list, setList] = useState<Note[]>([]);

	useEffect(() => {
		const timeout = setTimeout(
			() =>
				setList(
					Array.from({ length: 25 }, (_, i) => ({ id: String(i) }))
				),
			2 * 1000
		);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (id || list.length === 0) return;
		router.push(`/${list.at(0).id}`, undefined, { shallow: true });
	}, [id, list]);

	return (
		<ListView>
			<div className={styles.left}>
				<List active={id as string} list={list} />
				<Settings />
			</div>
			<div className={styles.right}></div>
		</ListView>
	);
};
