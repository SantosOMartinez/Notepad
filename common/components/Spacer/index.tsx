import cn from "classnames";

import styles from "./spacer.module.css";

interface Props {
	flexible?: boolean;
}

export default ({ flexible }: Props) => (
	<span className={cn(styles.spacer, { [styles.flexible]: flexible })} />
);
