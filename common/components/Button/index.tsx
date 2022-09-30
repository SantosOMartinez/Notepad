import cn from "classnames";
import { ButtonHTMLAttributes } from "react";

import Icon from "@components/Icon";
import { IconName } from "@type/icons";

import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: IconName;
	dropDown?: boolean;
}

export default ({ icon, dropDown, className, ...props }: Props) => (
	<button {...props} className={cn(styles.button, className)}>
		<Icon icon={icon} />
		{dropDown && <Icon icon="chevron-down" className={styles.icon} />}
	</button>
);
