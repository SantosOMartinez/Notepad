interface Props {}
import Button from "@components/Button";
import Divider from "@components/Divider";
import Multiselect from "@components/Multiselect";
import Search from "@components/Search";
import Spacer from "@components/Spacer";
import { suggestions } from "@constants/text";

import styles from "./toolbar.module.css";

export default ({}: Props) => {
	return (
		<nav className={styles.toolbar}>
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
			<Divider horizontal />
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
	);
};
