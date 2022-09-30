import { MutableRefObject, useEffect } from "react";

/**
 * Custom hook that triggers a function whenever focus is lost on the reference.
 * @param ref Reference to element to monitor.
 * @param callback Function to execute when loss of focus.
 */
export default function useOutsideClick<T extends HTMLElement>(
	ref: MutableRefObject<T>,
	callback: Function
) {
	useEffect(() => {
		const onBlur = (event) => {
			if (!ref.current.contains(event.target)) {
				callback();
			}
		};

		document.addEventListener("mousedown", onBlur);

		return () => document.removeEventListener("mousedown", onBlur);
	}, []);
}
