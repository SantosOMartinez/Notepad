import cn from "classnames";
import { Children, ReactNode } from "react";

import styles from "./folders.module.css";

interface Props {
	children?: ReactNode;
	open?: boolean;
	containerClassName?: string;
	folderClassName?: string;
	contentClassName?: string;
}

export default ({
	open,
	containerClassName,
	contentClassName,
	folderClassName,
	children,
}: Props) => {
	const [folder, ...rest] = Children.toArray(children);

	return (
		<div
			className={cn(styles.container, containerClassName, {
				[styles.open]: open,
			})}
		>
			<section className={cn(styles.folders, folderClassName)}>
				{folder}
			</section>
			<main className={cn(styles.content, contentClassName)}>{rest}</main>
		</div>
	);
};
