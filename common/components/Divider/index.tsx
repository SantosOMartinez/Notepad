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

	/**
	 * Optain the mouse's X axis delta.
	 */
	onChange?: (delta: number) => void;
	draggable?: boolean;
}

export default ({
	horizontal,
	vertical,
	draggable,
	onChange = () => {},
}: Props) => {
	const ref = useRef<HTMLSpanElement>(null);
	const isDragging = useRef(false);
	const x = useRef<number>(null);

	const onEnd = () => {
		freeCursor();
		isDragging.current = false;
		document.removeEventListener("mouseup", onEnd);
	};

	const onMove = (e: MouseEvent) => {
		if (!isDragging.current) return;

		if (isDragging.current && !draggable) {
			isDragging.current = false;
			return;
		}

		const delta = getDelta(x.current, e.clientX);
		onChange(delta);
		x.current = e.clientX;
	};

	const onStart = (e: ReactMouseEvent) => {
		x.current = e.clientX;
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
			{draggable && (
				<span
					className={styles.slider}
					ref={ref}
					onMouseDown={onStart}
				/>
			)}
		</div>
	);
};
