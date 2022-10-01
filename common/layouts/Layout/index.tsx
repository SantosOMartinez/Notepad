import cn from "classnames";
import { Children, ReactNode, useState } from "react";

import ResizableHStack from "@layouts/ResizableHStack";
import { Left, Right } from "@modules/Toolbar";

import styles from "./layout.module.css";

interface Props {
	children?: ReactNode;
}

export default ({ children }: Props) => {
	const [left, setLeft] = useState(false);
	const [right, setRight] = useState(false);

	const isHover = left || right;

	const sections = Children.toArray(children);
	const length = sections.length;
	return (
		<ResizableHStack
			className={cn(styles.container, { [styles.hover]: isHover })}
		>
			<div className={styles.left}>
				<Left
					onMouseEnter={() => setLeft(true)}
					onMouseLeave={() => setLeft(false)}
				/>
				{length > 0 && sections[0]}
			</div>
			<div className={styles.right}>
				<Right
					onMouseEnter={() => setRight(true)}
					onMouseLeave={() => setRight(false)}
				/>
				{length > 1 && sections[1]}
			</div>
		</ResizableHStack>
	);
};
