import { CssVariable } from "@type/css";

export function getCssProperty(element: Element, property: string) {
	return getComputedStyle(element).getPropertyValue(property);
}

export function getCssVariable(name: CssVariable) {
	return getCssProperty(document.documentElement, name);
}

export function setCssVariable(name: CssVariable, value: string) {
	return document.documentElement.style.setProperty(name, value);
}
