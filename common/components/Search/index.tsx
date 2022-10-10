import { Combobox, useComboboxState } from "ariakit/combobox";
import cn from "classnames";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import Icon from "@components/Icon";
import useUpdateEffect from "@hooks/useUpdateEffect";
import { Suggestion } from "@type/search";

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
	onFilter?: (suggestion: number) => void;
}

export default ({
	suggestions = [],
	onChange = () => {},
	onFilter = () => {},
}: Props) => {
	const [suggestion, setSuggestion] = useState<number>();
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
		() => combobox.setOpen(suggestion === undefined && !combobox.value),
		[suggestion, combobox.value]
	);

	const focusInput = () => {
		if (!ref) return;

		ref.focus();
		ref.setSelectionRange(0, 0);
		combobox.setOpen(suggestion === undefined && !combobox.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;
		if (handleEscapeKey(key)) return;

		const start = e.currentTarget.selectionStart;
		const end = e.currentTarget.selectionEnd;
		const isValid = start === 0 && end === 0;
		const isValidKey = key === keys.left || key === keys.backspace;
		if (isValid && isValidKey && suggestion !== undefined)
			tagRef.current.focus();
	};

	const handleEscapeKey = (key: string) => {
		if (key !== keys.esc) return false;

		combobox.setValue("");
		setSuggestion(undefined);
		focusInput();
		return true;
	};

	const handleSuggestion = (e: KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;

		if (handleEscapeKey(key)) return;

		if (key === keys.del || key === keys.backspace) {
			focusInput();
			setSuggestion(undefined);
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
				{suggestion != null && (
					<button
						className={cn(styles.tag, "caption")}
						ref={tagRef}
						onKeyDown={handleSuggestion}
						onClick={(e) => {
							e.currentTarget.focus();
							e.stopPropagation();
						}}
					>
						{suggestions[suggestion].tag}
					</button>
				)}
				<Combobox
					state={combobox}
					placeholder="Search"
					onKeyDown={handleKeyDown}
					onFocus={() =>
						combobox.setOpen(
							suggestion === undefined && !combobox.value
						)
					}
					showOnMouseDown={
						suggestion === undefined && !combobox.value
					}
					showOnKeyDown={suggestion === undefined && !combobox.value}
					showOnChange={(e: ChangeEvent<HTMLInputElement>) =>
						suggestion === undefined && !e.target.value
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
