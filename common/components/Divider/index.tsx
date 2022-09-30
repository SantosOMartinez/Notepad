import cn from "classnames";
import { useEffect, useRef } from "react";

import styles from "./divider.module.css";

const controlCursor = () => (document.documentElement.style.cursor = "pointer");
const freeCursor = () => (document.documentElement.style.cursor = "auto");

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

export default ({ horizontal, vertical }: Props) => {
	const ref = useRef<HTMLSpanElement>(null);
	const isDragging = useRef(false);

	const onEnd = () => {
		freeCursor();
		isDragging.current = false;
		document.removeEventListener("mouseup", onEnd);
	};

	const onMove = (e: MouseEvent) =>
		isDragging.current && console.log("dragging");

	const onStart = () => {
		controlCursor();
		isDragging.current = true;
		document.addEventListener("mouseup", onEnd);
	};

	useEffect(() => {
		document.addEventListener("mousemove", onMove);
		return () => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseup", onEnd);
		};
	}, []);

	return (
		<div
			className={cn(styles.divider, {
				[styles.vertical]: vertical,
				[styles.horizontal]: horizontal,
			})}
		>
			<span
				className={styles.slider}
				ref={ref}
				onMouseDown={onStart}
			></span>
		</div>
	);
};
