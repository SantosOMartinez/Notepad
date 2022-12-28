import cn from "classnames";
import {
    Children,
    cloneElement,
    CSSProperties,
    HTMLAttributes,
    ReactElement,
    useEffect,
    useRef,
    useState
} from "react";

import styles from "./wrap.module.css";

const isWrap = (first, current) => {
	const previous = current.previousElementSibling;

	if (!previous) {
		//TODO: Add logic to check when first element is to be "wrapped".
		const next = current.nextElementSibling;
		return current.offsetTop < next.offsetTop;
	}

	return current.offsetTop > first.offsetTop;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
	onWrap?: (elements: boolean[]) => void;
	flexDirection?: CSSProperties["flexDirection"];
	visibleClassName?: string;
	hiddenClassName?: string;
}

export default ({
	onWrap = () => {},
	flexDirection,
	children,
	className,
	visibleClassName,
	hiddenClassName,
	style,
	...props
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const [wrapped, setWrapped] = useState([]);

	const assignRows = (parent) => {
		let row = 0;
		const list: boolean[] = [];
		const children = [...parent.children];

		if (children.length == 0) return setWrapped(list);

		children.forEach((child) => {
			if (isWrap(child.previousElementSibling, child)) {
				row++;
			}
			list.push(row > 0);
		});

		setWrapped(list);
	};

	useEffect(() => onWrap(wrapped), [wrapped]);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				assignRows(entry.target);
			});
		});

		observer.observe(ref.current);
		assignRows(ref.current);
	}, [ref.current]);

	const display = Children.toArray(children).map((child: ReactElement, i) =>
		cloneElement(child, {
			className: wrapped.at(i) ? hiddenClassName : visibleClassName,
		})
	);

	return (
		<div {...props} className={cn(styles.container, className)}>
			<div
				className={cn(styles.content, className)}
				style={{ ...style, flexDirection }}
			>
				{display}
			</div>
			<div
				ref={ref}
				className={cn(styles.scaffold, className)}
				style={{ ...style, flexDirection }}
				tabIndex={-1}
			>
				{children}
			</div>
		</div>
	);
};
