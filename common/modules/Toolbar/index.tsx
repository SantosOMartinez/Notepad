import Split from "react-split-grid";

import Button from "@components/Button";
import Divider from "@components/Divider";
import Multiselect from "@components/Multiselect";
import Search from "@components/Search";
import Spacer from "@components/Spacer";
import { suggestions } from "@constants/text";

import styles from "./toolbar.module.css";

interface Props {}

export default ({}: Props) => {
	return (
		<Split
			cursor="col-resize"
			render={({ getGridProps, getGutterProps }) => (
				<nav className={styles.toolbar} {...getGridProps()}>
					<section className={styles.left}>
						<Button icon="panel-left" />
						<Spacer />
						<Multiselect
							defaultSelected={0}
							options={[{ icon: "list" }, { icon: "grid" }]}
						/>
						<Spacer flexible />
						<Button icon="trash" />
					</section>
					<Divider horizontal {...getGutterProps("column", 1)} />
					<section className={styles.right}>
						<Button icon="note" />
						<Spacer flexible />
						<Button icon="format" />
						<Button icon="checklist" />
						<Button icon="table" />
						<Spacer flexible />
						<Button icon="link" />
						<Button icon="photos" dropDown />
						<Button icon="lock" dropDown />
						<Button icon="collaborate" />
						<Button icon="share" />
						<Search suggestions={suggestions} />
					</section>
				</nav>
			)}
		/>
	);
};

/*
<Split className={styles.toolbar}>
				
			</Split>
*/
