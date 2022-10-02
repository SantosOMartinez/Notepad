import cn from "classnames";
import { cloneElement, HTMLAttributes, useRef, useState } from "react";

import useOutsideClick from "@hooks/onOutsideClick";

import styles from "./dropdown.module.css";

const cloneNode = (node, options) =>
	node ? cloneElement(node, options) : null;

interface Props extends HTMLAttributes<HTMLDivElement> {
	top?: boolean;
	bottom?: boolean;
	left?: boolean;
	right?: boolean;
}

export default ({
	className,
	children,
	top,
	bottom,
	left,
	right,
	...props
}: Props) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClick(ref, () => setOpen(false));

	const onClick = (e) => {
		if (children[0]?.onClick) {
			children[0].onClick(e);
		}
		setOpen((s) => !s);
	};

	const bodyClassName = cn(styles.body, {
		[styles.open]: open,
		[styles.top]: top,
		[styles.bottom]: bottom,
		[styles.left]: left,
		[styles.right]: right,
	});

	const head = cloneNode(children[0], { onClick });
	const body = cloneNode(children[1], { className: bodyClassName });
	return (
		<div ref={ref} className={cn(styles.wrapper, className)} {...props}>
			{head}
			{body}
		</div>
	);
};
