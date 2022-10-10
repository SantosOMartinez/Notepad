import { RenderElementProps, RenderLeafProps } from "slate-react";

import { TextType } from "@type/text";

import styles from "./block.module.css";

export const Element = ({
	children,
	element,
	attributes,
}: RenderElementProps) => {
	switch (element.type) {
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

export const Leaf = ({ children, text, attributes }: RenderLeafProps) => {
	const leaf = text?.annotations;

	if (text?.link) {
		children = (
			<a
				href={text.link.url}
				{...attributes}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}

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
