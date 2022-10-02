import cn from "classnames";
import {
    CSSProperties,
    HTMLAttributes,
    ReactHTMLElement,
    useEffect,
    useRef,
    useState
} from "react";

const isWrap = (first, current) => {
	const previous = current.previousElementSibling;

	if (!previous) return false;

	return current.offsetTop > first.offsetTop;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
	onWrap?: (elements: boolean[]) => void;
	flexDirection?: CSSProperties["flexDirection"];
}

export default ({
	onWrap = () => {},
	flexDirection,
	children,
	style,
	...props
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);

	const assignRows = (parent) => {
		let row = 0;
		const list: boolean[] = [];
		const children = [...parent.children];

		if (children.length == 0) return onWrap(list);

		children.forEach((child) => {
			if (isWrap(child.previousElementSibling, child)) {
				row++;
			}
			list.push(row > 0);
		});

		onWrap(list);
	};

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

	return (
		<div style={{ ...style, flexDirection }} {...props} ref={ref}>
			{children}
		</div>
	);
};
