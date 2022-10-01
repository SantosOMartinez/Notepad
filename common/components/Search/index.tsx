import cn from "classnames";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import Icon from "@components/Icon";
import useOutsideClick from "@hooks/onOutsideClick";
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
	const [visible, setVisible] = useState(false);
	const [focused, setFocused] = useState(false);
	const [suggestion, setSuggestion] = useState<number>();

	useUpdateEffect(() => onFilter(suggestion), [suggestion]);

	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const tagRef = useRef<HTMLButtonElement>(null);

	useOutsideClick(ref, () => {
		setVisible(false);
		setFocused(false);
		inputRef.current.blur();
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value;
		onChange(text);
		text ? setVisible(false) : setVisible(true);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;
		const start = e.currentTarget.selectionStart;
		const end = e.currentTarget.selectionEnd;
		const isValid = start === 0 && end === 0;
		const isValidKey = key === keys.left || key === keys.backspace;
		if (isValid && isValidKey && suggestion !== undefined)
			tagRef.current.focus();
	};

	const handleEscapeKey = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== keys.esc) return;

		inputRef.current.value = "";
		inputRef.current.focus();
		setSuggestion(undefined);
		setVisible(true);
	};

	const handleSuggestion = (e: KeyboardEvent<HTMLInputElement>) => {
		const key = e.key;

		if (key === keys.del || key === keys.backspace) {
			inputRef.current.focus();
			setSuggestion(undefined);
			return;
		}

		if (key === keys.right || key === keys.up || key === keys.down) {
			inputRef.current.focus();
			return;
		}

		inputRef.current.focus();
		inputRef.current.setSelectionRange(0, 0);
		setSuggestion(undefined);
	};

	return (
		<div
			className={cn(styles.wrapper, { [styles.focused]: focused })}
			ref={ref}
			onFocus={() =>
				suggestion === undefined &&
				!inputRef.current.value &&
				setVisible(true)
			}
			onClick={() => {
				inputRef.current.focus();
				setFocused(true);
			}}
			onKeyDown={handleEscapeKey}
		>
			<div
				className={cn(styles.search, {
					[styles.visible]: visible,
				})}
			>
				<Icon icon="search" />
				{suggestion != null && (
					<button
						className={cn(styles.tag, "caption")}
						ref={tagRef}
						onKeyDown={handleSuggestion}
						onClick={(e) => {
							e.currentTarget.focus();
							e.stopPropagation();
							setFocused(true);
						}}
					>
						{suggestions[suggestion].tag}
					</button>
				)}
				<input
					placeholder="Search"
					ref={inputRef}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onFocus={() => setFocused(true)}
				/>
			</div>
			<Suggestions
				suggestions={suggestions}
				visible={visible && suggestion === undefined}
				onClick={(selected) => {
					inputRef.current.focus();
					setSuggestion(selected);
				}}
			/>
		</div>
	);
};
