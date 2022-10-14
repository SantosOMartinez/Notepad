import { useState } from "react";

import NoteDirectory from "@components/NoteDirectory";
import { groups } from "@mockup/directories";

import styles from "./folders.module.css";

export default () => {
	const [selected, setSelected] = useState<string>();
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
