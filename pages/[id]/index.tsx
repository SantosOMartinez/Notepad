import { useRecoilValue } from "recoil";

import { initialConfig } from "@components/Editor/util";
import Settings from "@components/Settings";
import Layout2 from "@layouts/Layout2";
import Layout3 from "@layouts/Layout3";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { sidebarState } from "@state/layout";
import Editor from "@templates/Editor";
import Folders from "@templates/Folders";
import List from "@templates/List";

import styles from "./style.module.css";

export default () => {
	const open = useRecoilValue(sidebarState);

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<Layout3 open={open}>
				<Folders />
				<Layout2>
					<div className={styles.left}>
						<List />
						<Settings />
					</div>
					<Editor />
				</Layout2>
			</Layout3>
		</LexicalComposer>
	);
};
