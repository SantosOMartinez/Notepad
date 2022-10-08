import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Theme from "@components/Theme";
import ListView from "@layouts/ListView";
import List from "@templates/List";

import styles from "./style.module.css";

export default () => {
	const router = useRouter();
	const { id } = router.query;
	const [list, setList] = useState([]);

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

	return (
		<ListView>
			<div className={styles.left}>
				<List active={id as string} list={list} />
				<Theme />
			</div>
			<div className={styles.right}></div>
		</ListView>
	);
};
