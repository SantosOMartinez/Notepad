import cn from "classnames";
import { Children, ReactNode, useState } from "react";

import ResizableHStack from "@layouts/ResizableHStack";
import { Left, Right } from "@modules/Toolbar";

import styles from "./listView.module.css";

interface Props {
	children?: ReactNode;
}

export default ({ children }: Props) => {
	const [hover, setHover] = useState(false);
	const sections = Children.toArray(children);
	const length = sections.length;

	const onEnter = () => setHover(true);
	const onLeave = () => setHover(false);

	return (
		<ResizableHStack
			className={cn(styles.container, { [styles.hover]: hover })}
		>
			<div className={styles.left}>
				<Left onMouseEnter={onEnter} onMouseLeave={onLeave} />
				{length > 0 && sections[0]}
			</div>
			<div className={styles.right}>
				<Right onMouseEnter={onEnter} onMouseLeave={onLeave} />
				{length > 1 && sections[1]}
			</div>
		</ResizableHStack>
	);
};
