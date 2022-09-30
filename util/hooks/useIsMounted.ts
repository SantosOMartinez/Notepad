import { useEffect, useRef } from "react";

/*
    https://www.querythreads.com/react-hooks-use-effect-only-on-update/
*/

/**
 * Custom hook that determines if it is mounted or not.
 * @returns Reference of mounted status.
 */
export default function useIsMounted() {
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	return isMounted;
}
