import cn from "classnames";
import { MouseEvent as ReactMouseEvent, useEffect, useRef } from "react";

import styles from "./divider.module.css";

const controlCursor = () => {
	document.body.classList.add(styles.cursor);
	document.onselectstart = () => false;
};
const freeCursor = () => {
	document.body.classList.remove(styles.cursor);
	document.onselectstart = () => true;
};

const getDelta = (previous: number | null, current: number | null) => {
	if (previous === null || current == null) return 0;
	return current - previous;
};

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
