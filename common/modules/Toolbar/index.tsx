interface Props {}
import { MutableRefObject, useRef } from "react";

import Button from "@components/Button";
import Divider from "@components/Divider";
import Multiselect from "@components/Multiselect";
import Search from "@components/Search";
import Spacer from "@components/Spacer";
import { sidebarId } from "@constants/css";
import { suggestions } from "@constants/text";
import useResize from "@hooks/useResize";

import styles from "./toolbar.module.css";

export default ({}: Props) => {
	const ref = useRef<HTMLElement>(null);

	const move = useResize(sidebarId, ref);

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
			<Divider horizontal draggable onChange={(delta) => move(delta)} />
			<section className={styles.right} ref={ref}>
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
