import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import NoteDirectory from "@components/NoteDirectory";
import { groups } from "@mockup/directories";
import { locationState } from "@state/notes";

import styles from "./folders.module.css";

export default () => {
	const [selected, setSelected] = useRecoilState(locationState);
	useEffect(() => {
		const storage = JSON.parse(localStorage.getItem("location"));
		let directory = groups.at(0).directories.at(0);

		if (!storage && !directory) return;

		setSelected({
			id: storage?.id ?? directory.id,
			name: storage?.name ?? directory.name,
		});
	}, []);

	useEffect(() => {
		if (!selected) return;
		localStorage.setItem("location", JSON.stringify(selected));
	}, [selected]);

	return (
		<div className={styles.container}>
			<NoteDirectory
				groups={groups}
				selected={selected}
				onChange={setSelected}
			/>
		</div>
	);
};
