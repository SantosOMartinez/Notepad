import { DependencyList, EffectCallback, useEffect, useRef } from "react";

import useIsMounted from "./useIsMounted";

/*
    https://www.querythreads.com/react-hooks-use-effect-only-on-update/
*/

/**
 * Custom useEffect hook that only triggers on updates, not on initial mount.
 * @param effect Imperative function that can return a cleanup function.
 * @param dependencies If present, effect will only activate if the values in the list change.
 */
export default function useUpdateEffect(
	effect: EffectCallback,
	dependencies?: DependencyList
) {
	const isMounted = useIsMounted();
	const isFirstMount = useRef(true);

	useEffect(() => {
		let cleanup = () => {};

		if (isFirstMount.current) {
			isFirstMount.current = false;
		} else {
			cleanup = effect() || cleanup;
		}

		return () => {
			cleanup();
			if (!isMounted.current) {
				isFirstMount.current = true;
			}
		};
	}, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}
