import cn from "classnames";
import { HTMLAttributes, useState } from "react";

import Button from "@components/Button";
import Dropdown from "@components/Dropdown";
import ModalCard from "@components/ModalCard";
import Multiselect from "@components/Multiselect";
import Search from "@components/Search";
import Spacer from "@components/Spacer";
import Wrap from "@components/Wrap";
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

export const Right = (props: Props) => {
	const [wrapped, setWrapped] = useState([]);

	console.log(wrapped);

	return (
		<section className={styles.right} {...props}>
			<Button icon="note" />
			<Spacer flexible />
			<Button icon="format" />
			<Button icon="checklist" />
			<Button icon="table" />
			<Spacer flexible />
			<Wrap
				className={styles.hStack}
				onWrap={(elements) => setWrapped(elements)}
				hiddenClassName={styles.vanish}
				visibleClassName={styles.item}
			>
				<Button icon="link" />
				<Button icon="photos" dropDown />
				<Dropdown>
					<Button icon="lock" dropDown />
					<ModalCard>
						<p>banana</p>
					</ModalCard>
				</Dropdown>
				<Button icon="collaborate" />

				<Button icon="share" />
			</Wrap>
			{wrapped.at(-1) && (
				<Button
					icon="chevron-right-double"
					className={cn(styles.more, {
						[styles.slide]: wrapped.at(-1),
					})}
				/>
			)}
			<Search suggestions={suggestions} />
		</section>
	);
};
