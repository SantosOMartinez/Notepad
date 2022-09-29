import cn from "classnames";

import icons from "@constants/icons";
import { IconName } from "@type/icons";

interface Props {
	size?: number | string;
	className?: string;
	icon: IconName;
	removeFillRule?: boolean;
	removeClipRule?: boolean;
}

export default ({
	size = 18,
	className,
	icon,
	removeClipRule,
	removeFillRule,
}: Props) => {
	const isArray = Array.isArray(icons[icon]);

	const toPath = (d: string, key?: number) => (
		<path
			{...{
				key,
				fillRule: removeFillRule ? undefined : "evenodd",
				clipRule: removeClipRule ? undefined : "evenodd",
			}}
			d={d}
		></path>
	);

	const paths = isArray
		? (icons[icon] as string[]).map((d, i) => toPath(d, i))
		: toPath(icons[icon] as string);

	return (
		<svg
			className={cn(className)}
			width={size}
			height={size}
			viewBox="0 0 24 24"
		>
			{paths}
		</svg>
	);
};
