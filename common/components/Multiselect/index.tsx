import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

import Button from "@components/Button";
import useUpdateEffect from "@hooks/useUpdateEffect";
import { IconName } from "@type/icons";

import styles from "./multiselect.module.css";

export interface Option {
	tooltip?: string;
	icon: IconName;
}

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
	defaultSelected?: number;
	onSelect?: (select?: number) => void;
	options?: Option[];
}

export default ({
	defaultSelected,
	onSelect = () => {},
	options = [],
	...props
}: Props) => {
	const [selected, setSelected] = useState(defaultSelected);

	useUpdateEffect(() => onSelect(selected), [selected]);

	return (
		<div className={styles.multiselect} {...props}>
			{options.map(({ icon, tooltip }, i) => (
				<Button
					icon={icon}
					title={tooltip}
					key={i}
					onClick={() => setSelected(i)}
					className={i == selected ? styles.selected : undefined}
				/>
			))}
		</div>
	);
};
