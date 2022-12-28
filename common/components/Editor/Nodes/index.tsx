import cn from "classnames";
import {
    RenderElementProps,
    RenderLeafProps,
    useFocused,
    useSelected
} from "slate-react";

import { ElementType as Type } from "@type/editor";

import styles from "./block.module.css";

export const Element = ({
	children,
	element,
	attributes,
}: RenderElementProps) => {
	switch (element.type) {
		case Type.THead:
			return <thead {...attributes}>{children}</thead>;
		case Type.TBody:
			return <tbody {...attributes}>{children}</tbody>;
		case Type.Table:
			return <table {...attributes}>{children}</table>;
		case Type.TRow:
			return <tr {...attributes}>{children}</tr>;
		case Type.TCell:
			return <td {...attributes}>{children}</td>;
		case Type.THeader:
			return <th {...attributes}>{children}</th>;
		case Type.ListItem:
			return <li {...attributes}>{children}</li>;
		case Type.Media:
			return (
				<ImageElement
					attributes={attributes}
					element={element}
					children={children}
				/>
			);
		case Type.Title:
			return (
				<h1 className={styles.title} {...attributes}>
					{children}
				</h1>
			);
		case Type.Heading:
			return (
				<h2 className={styles.heading} {...attributes}>
					{children}
				</h2>
			);
		case Type.Subheading:
			return (
				<h3 className={styles.subheading} {...attributes}>
					{children}
				</h3>
			);

		case Type.DashedList:
		case Type.BulletedList:
			return (
				<ul
					className={
						element.type === Type.BulletedList
							? styles.bulletedList
							: styles.dashedList
					}
					{...attributes}
				>
					<li>{children}</li>
				</ul>
			);
		case Type.NumberedList:
			return (
				<ol className={styles.numberedList} {...attributes}>
					<li>{children}</li>
				</ol>
			);
		case Type.Monospaced:
			return (
				<p className={styles.monoscaped} {...attributes}>
					{children}
				</p>
			);
		case Type.Body:
		default:
			return (
				<p className={styles.body} {...attributes}>
					{children}
				</p>
			);
	}
};

export const Leaf = ({ children, text, attributes, leaf }: RenderLeafProps) => {
	if (leaf.link)
		return (
			<a
				href={text.link.url}
				{...attributes}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);

	if (leaf?.bold) {
		children = <strong {...attributes}>{children}</strong>;
	}

	if (leaf?.strikethrough) {
		children = <s {...attributes}>{children}</s>;
	}

	if (leaf?.italic) {
		children = <em {...attributes}>{children}</em>;
	}

	if (leaf?.underline) {
		children = <u {...attributes}>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

export const ImageElement = ({
	attributes,
	children,
	element,
}: RenderElementProps) => {
	const selected = useSelected();
	const focused = useFocused();
	return (
		<div {...attributes}>
			{children}
			<img
				src={element.type}
				className={cn(styles.image, {
					[styles.selected]: selected && focused,
				})}
			/>
		</div>
	);
};
