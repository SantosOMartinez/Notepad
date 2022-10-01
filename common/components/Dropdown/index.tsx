import cn from "classnames";
import {
    cloneElement,
    HTMLAttributes,
    ReactNode,
    useRef,
    useState
} from "react";

import useOutsideClick from "@hooks/onOutsideClick";

import styles from "./dropdown.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
	dropdown?: ReactNode;
	top?: boolean;
	bottom?: boolean;
	left?: boolean;
	right?: boolean;
}

export default ({
	className,
	children,
	dropdown,
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

	const head = cloneElement(children as any, { onClick });
	const body = cloneElement(dropdown as any, { className: bodyClassName });

	return (
		<div ref={ref} className={cn(styles.wrapper, className)} {...props}>
			{head}
			{body}
		</div>
	);
};
