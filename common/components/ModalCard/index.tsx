import cn from "classnames";
import { HTMLAttributes } from "react";

import styles from "./card.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default ({ className, ...props }: Props) => {
	return <div className={cn(styles.container, className)} {...props} />;
};
