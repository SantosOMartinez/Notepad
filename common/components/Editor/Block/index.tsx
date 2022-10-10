import cn from "classnames";
import {
    RenderElementProps,
    RenderLeafProps,
    useFocused,
    useSelected
} from "slate-react";

import { HelperType, TextType } from "@type/text";

import styles from "./block.module.css";

export const Element = ({
	children,
	element,
	attributes,
}: RenderElementProps) => {
	switch (element.type) {
		case HelperType.THead:
			return <thead {...attributes}>{children}</thead>;
		case HelperType.TBody:
			return <tbody {...attributes}>{children}</tbody>;
		case HelperType.Table:
			return <table {...attributes}>{children}</table>;
		case HelperType.TRow:
			return <tr {...attributes}>{children}</tr>;
		case HelperType.TCell:
			return <td {...attributes}>{children}</td>;
		case HelperType.THeader:
			return <th {...attributes}>{children}</th>;
		case HelperType.ListItem:
			return <li {...attributes}>{children}</li>;
		case HelperType.Image:
			return (
				<ImageElement
					attributes={attributes}
					element={element}
					children={children}
				/>
			);
		case TextType.Title:
			return (
				<h1 className={styles.title} {...attributes}>
					{children}
				</h1>
			);
		case TextType.Heading:
			return (
				<h2 className={styles.heading} {...attributes}>
					{children}
				</h2>
			);
		case TextType.Subheading:
			return (
				<h3 className={styles.subheading} {...attributes}>
					{children}
				</h3>
			);

		case TextType.DashedList:
		case TextType.BulletedList:
			return (
				<ul
					className={
						element.type === TextType.BulletedList
							? styles.bulletedList
							: styles.dashedList
					}
					{...attributes}
				>
					<li>{children}</li>
				</ul>
			);
		case TextType.NumberedList:
			return (
				<ol className={styles.numberedList} {...attributes}>
					<li>{children}</li>
				</ol>
			);
		case TextType.Monospaced:
			return (
				<p className={styles.monoscaped} {...attributes}>
					{children}
				</p>
			);
		case TextType.Body:
		default:
			return (
				<p className={styles.body} {...attributes}>
					{children}
				</p>
			);
	}
};

export const Leaf = ({ children, text, attributes, leaf }: RenderLeafProps) => {
	const mark = leaf?.annotations;

	if (mark?.bold) {
		children = <strong {...attributes}>{children}</strong>;
	}

	if (mark?.strikethrough) {
		children = <s {...attributes}>{children}</s>;
	}

	if (mark?.italic) {
		children = <em {...attributes}>{children}</em>;
	}

	if (mark?.underline) {
		children = <u {...attributes}>{children}</u>;
	}

	return leaf?.link ? (
		<a
			href={text.link.url}
			{...attributes}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	) : (
		<span {...attributes}>{children}</span>
	);
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
				src={element.url}
				className={cn(styles.image, {
					[styles.selected]: selected && focused,
				})}
			/>
		</div>
	);
};
