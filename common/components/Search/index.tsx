import { Combobox, useComboboxState } from "ariakit/combobox";
import cn from "classnames";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import Icon from "@components/Icon";
import useUpdateEffect from "@hooks/useUpdateEffect";
import { SearchTag, Suggestion } from "@type/search";

import styles from "./search.module.css";
import Suggestions from "./Suggestions";

const keys = {
	backspace: "Backspace",
	del: "Delete",
	left: "ArrowLeft",
	right: "ArrowRight",
	up: "ArrowUp",
	down: "ArrowDown",
	esc: "Escape",
};

interface Props {
	/**
	 * Fired when search text has changed.
	 */
	onChange?: (text: string) => void;
	/**
	 * Categories to filter.
	 */
	suggestions?: Suggestion[];
	/**
	 * When a suggestion is selected to be used in filtering.
	 */
	onFilter?: (tag: SearchTag) => void;
}

export default ({
	suggestions = [],
	onChange = () => {},
	onFilter = () => {},
}: Props) => {
	const [suggestion, setSuggestion] = useState<SearchTag>(null);
	const combobox = useComboboxState({
		animated: true,
		gutter: 8,
		fitViewport: true,
		overlap: true,
	});

	const ref = combobox.anchorRef.current as HTMLInputElement;
	const tagRef = useRef<HTMLButtonElement>(null);

	useUpdateEffect(() => onFilter(suggestion), [suggestion]);
	useEffect(() => onChange(combobox.value), [combobox.value]);

	useUpdateEffect(
		() => combobox.setOpen(suggestion === null && !combobox.value),
		[suggestion, combobox.value]
	);

	const focusInput = () => {
		if (!ref) return;

		ref.focus();
		ref.setSelectionRange(0, 0);
		combobox.setOpen(suggestion === null && !combobox.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;
		if (handleEscapeKey(key)) return;

		const start = e.currentTarget.selectionStart;
		const end = e.currentTarget.selectionEnd;
		const isValid = start === 0 && end === 0;
		const isValidKey = key === keys.left || key === keys.backspace;
		if (isValid && isValidKey && suggestion !== null)
			tagRef.current.focus();
	};

	const handleEscapeKey = (key: string) => {
		if (key !== keys.esc) return false;

		combobox.setValue("");
		setSuggestion(null);
		focusInput();
		return true;
	};

	const handleSuggestion = (e: KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;

		if (handleEscapeKey(key)) return;

		if (key === keys.del || key === keys.backspace) {
			focusInput();
			setSuggestion(null);
			return;
		}

		focusInput();
	};

	return (
		<div
			className={cn(styles.wrapper, {
				[styles.focused]:
					typeof document !== "undefined" &&
					document.activeElement === ref,
			})}
		>
			<div className={styles.search} onClick={() => ref.focus()}>
				<Icon icon="search" />
				{suggestion !== null && (
					<button
						className={cn(styles.tag, "caption")}
						ref={tagRef}
						onKeyDown={handleSuggestion}
						onClick={(e) => {
							e.currentTarget.focus();
							e.stopPropagation();
						}}
					>
						{suggestion}
					</button>
				)}
				<Combobox
					state={combobox}
					placeholder="Search"
					onKeyDown={handleKeyDown}
					onFocus={() =>
						combobox.setOpen(suggestion === null && !combobox.value)
					}
					showOnMouseDown={suggestion === null && !combobox.value}
					showOnKeyDown={suggestion === null && !combobox.value}
					showOnChange={(e: ChangeEvent<HTMLInputElement>) =>
						suggestion === null && !e.target.value
					}
				/>
			</div>
			<Suggestions
				state={combobox}
				suggestions={suggestions}
				onClick={(selected) => {
					setSuggestion(selected);
					ref.focus();
				}}
			/>
		</div>
	);
};
