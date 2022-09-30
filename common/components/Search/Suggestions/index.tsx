import cn from "classnames";

import Icon from "@components/Icon";
import { IconName } from "@type/icons";

import styles from "./suggestions.module.css";

export interface Suggestion {
	icon: IconName;
	name: string;
	tag: string;
}

interface Props {
	suggestions?: Suggestion[];
	visible?: boolean;
	onClick?: (selectd: number) => void;
}

export default ({ suggestions = [], visible, onClick = () => {} }: Props) => {
	return (
		<span
			className={cn(styles.suggestions, { [styles.visible]: visible })}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<p className={styles.title}>Suggested Searches</p>
			<span className={styles.scrollbar}>
				{suggestions.map(({ icon, name }, i) => (
					<button
						className={styles.suggestion}
						key={i}
						onClick={(e) => onClick(i)}
					>
						<Icon icon={icon} />
						<p>{name}</p>
					</button>
				))}
			</span>
		</span>
	);
};
