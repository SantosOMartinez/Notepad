import { useState } from "react";
import { useRecoilState } from "recoil";

import NoteDirectory from "@components/NoteDirectory";
import { groups } from "@mockup/directories";
import { locationState } from "@state/notes";

import styles from "./folders.module.css";

export default () => {
	const [selected, setSelected] = useRecoilState(locationState);
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
