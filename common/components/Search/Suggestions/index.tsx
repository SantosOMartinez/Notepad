import { Button } from "ariakit/Button";
import { ComboboxPopover, ComboboxPopoverOptions } from "ariakit/combobox";
import cn from "classnames";

import Icon from "@components/Icon";
import popoverStyles from "@components/Menu/menu.module.css";
import { Suggestion } from "@type/search";

import styles from "./suggestions.module.css";

interface Props extends ComboboxPopoverOptions {
	suggestions?: Suggestion[];
	visible?: boolean;
	onClick?: (selectd: number) => void;
}

export default ({ suggestions = [], onClick = () => {}, state }: Props) => {
	return (
		<ComboboxPopover state={state} portal className={popoverStyles.popover}>
			<p className={styles.title}>Suggested Searches</p>
			<span className={styles.scrollbar}>
				{suggestions.map(({ icon, name }, i) => (
					<Button
						className={styles.suggestion}
						key={i}
						onClick={() => onClick(i)}
					>
						<Icon icon={icon} />
						<p>{name}</p>
					</Button>
				))}
			</span>
		</ComboboxPopover>
	);
};
