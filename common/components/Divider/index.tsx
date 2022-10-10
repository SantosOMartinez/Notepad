import cn from "classnames";

import styles from "./divider.module.css";

interface Props {
	/**
	 * Add padding to the horizontal axis.
	 */
	horizontal?: boolean;
	/**
	 * Add padding to the verticalaxis.
	 */
	vertical?: boolean;
}

export default ({ horizontal, vertical, ...props }: Props) => {
	return (
		<div
			{...props}
			className={cn(styles.divider, {
				[styles.vertical]: vertical,
				[styles.horizontal]: horizontal,
			})}
		/>
	);
};
