import cn from "classnames";
import { HTMLAttributes } from "react";

import styles from "./divider.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Add padding to the horizontal axis.
	 */
	horizontal?: boolean;
	/**
	 * Add padding to the verticalaxis.
	 */
	vertical?: boolean;
}

export default ({ horizontal, vertical, className, ...props }: Props) => {
	return (
		<div
			{...props}
			className={cn(
				styles.divider,
				{
					[styles.vertical]: vertical,
					[styles.horizontal]: horizontal,
				},
				className
			)}
		/>
	);
};
