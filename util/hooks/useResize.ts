import { MutableRefObject } from "react";

import { getCssProperty, getCssVariable, setCssVariable } from "@functions/css";
import { CssVariable } from "@type/css";

const getMin = (ref: MutableRefObject<HTMLElement>) =>
	ref.current && getCssProperty(ref.current, "min-width");

const isMaxed = (ref: MutableRefObject<HTMLElement>, delta?: number) => {
	const min = cssToNumber(getMin(ref));
	const width = cssToNumber(getCssProperty(ref.current, "width"));
	return width - (delta ?? 0) - min <= 0;
};

const cssToNumber = (str: string | null) => {
	if (str === null) return 0;
	return Number(str.slice(0, -2));
};

export default function useResize(
	id: CssVariable,
	ref: MutableRefObject<HTMLElement>
) {
	return (delta: number) => {
		if (isMaxed(ref, delta) && delta > 0) return;

		const width = cssToNumber(getCssVariable(id));
		setCssVariable(id, `${width + delta}px`);
	};
}
