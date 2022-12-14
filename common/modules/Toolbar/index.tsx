import cn from "classnames";
import { HTMLAttributes, useState } from "react";

import Button from "@components/Button";
import Multiselect from "@components/Multiselect";
import Spacer from "@components/Spacer";
import Wrap from "@components/Wrap";
import { suggestions } from "@constants/text";

import {
    Copy,
    CreateNote,
    DeleteNote,
    Lock,
    Photos,
    Sidebar
} from "./controls";
import Format from "./controls/Format";
import Link from "./controls/Link";
import More from "./controls/More";
import Search from "./controls/Search";
import styles from "./toolbar.module.css";

interface Props extends HTMLAttributes<HTMLElement> {}

export const Left = (props: Props) => (
	<section className={styles.left} {...props}>
		<Sidebar />
		<Spacer />
		<Multiselect
			defaultSelected={0}
			options={[{ icon: "list" }, { icon: "grid" }]}
		/>
		<Spacer flexible />
		<DeleteNote />
	</section>
);

export const Right = (props: Props) => {
	const [wrapped, setWrapped] = useState([]);

	return (
		<section className={styles.right} {...props}>
			<CreateNote />
			<Spacer flexible />
			<Format />
			<Button icon="checklist" />
			<Button icon="table" />
			<Wrap
				className={styles.hStack}
				onWrap={(elements) => setWrapped(elements)}
				hiddenClassName={styles.vanish}
				visibleClassName={styles.item}
			>
				<Link />
				<Photos />
				<Lock />
				<Button icon="collaborate" />
				<Copy />
			</Wrap>
			{wrapped.at(-1) && (
				<More
					className={cn(styles.more, {
						[styles.slide]: wrapped.at(-1),
					})}
					visible={wrapped}
				/>
			)}
			<Search />
		</section>
	);
};
