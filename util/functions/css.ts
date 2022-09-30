import { CssVariable } from "@type/css";

export function getCssVariable(name: CssVariable) {
	return getComputedStyle(document.documentElement).getPropertyValue(name);
}

export function setCssVariable(name: CssVariable, value: string) {
	return document.documentElement.style.setProperty(name, value);
}
