import cn from "classnames";
import Link from "next/link";

import Icon from "@components/Icon";

import styles from "./settings.module.css";

interface Props {}

export default ({}: Props) => {
	return (
		<div className={styles.container}>
			<Link href="/settings">
				<a className={styles.btn}>
					<Icon icon="settings" className={styles.icon} />
					<p>Settings</p>
				</a>
			</Link>
		</div>
	);
};
