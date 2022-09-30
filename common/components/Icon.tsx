import { CSSProperties, ReactNode, SVGProps } from "react";

import icons from "@constants/icons";
import { IconName } from "@type/icons";

/**
 * Fill rule contains the same values as clip rule, therefor they can be used
 * interchangeably.
 */
type Rule = SVGProps<SVGPathElement>["fillRule"];

interface Props {
	size?: number | string;
	className?: string;
	icon: IconName;
	fillRule?: Rule;
	clipRule?: Rule;
	style?: CSSProperties;
	children?: ReactNode;
}

export default ({
	size = 18,
	className,
	style,
	icon,
	clipRule = "evenodd",
	fillRule = "evenodd",
	children,
}: Props) => {
	const isArray = Array.isArray(icons[icon]);

	const toPath = (d: string, key?: number) => (
		<path {...{ key, fillRule, clipRule }} d={d} />
	);

	const paths = isArray
		? (icons[icon] as string[]).map((d, i) => toPath(d, i))
		: toPath(icons[icon] as string);

	return (
		<svg
			className={className}
			style={style}
			width={size}
			height={size}
			viewBox="0 0 24 24"
		>
			{paths}
			{children}
		</svg>
	);
};
