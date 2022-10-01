import { HTMLAttributes } from "react";

import Button from "@components/Button";
import Multiselect from "@components/Multiselect";
import Search from "@components/Search";
import Spacer from "@components/Spacer";
import { suggestions } from "@constants/text";

import styles from "./toolbar.module.css";

interface Props extends HTMLAttributes<HTMLElement> {}

export const Left = (props: Props) => (
	<section className={styles.left} {...props}>
		<Button icon="panel-left" />
		<Spacer />
		<Multiselect
			defaultSelected={0}
			options={[{ icon: "list" }, { icon: "grid" }]}
		/>
		<Spacer flexible />
		<Button icon="trash" />
	</section>
);

export const Right = (props: Props) => (
	<section className={styles.right} {...props}>
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
);
