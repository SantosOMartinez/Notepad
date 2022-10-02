import cn from "classnames";
import { Children, Fragment, HTMLAttributes, useEffect, useState } from "react";
import Split from "react-split-grid";

import Divider from "@components/Divider";

import styles from "./resizableHStack.module.css";

interface MaxSize {
	[key: number]: number;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
	maxSizes?: MaxSize;
	minSizes?: MaxSize;
}

export default ({
	children,
	className,
	minSizes,
	maxSizes,
	...props
}: Props) => {
	return (
		<Split
			cursor="col-resize"
			columnMaxSizes={maxSizes}
			columnMinSizes={minSizes}
			render={({ getGridProps, getGutterProps }) => (
				<div
					className={cn(styles.wrapper, className)}
					{...props}
					{...getGridProps()}
				>
					{Children.toArray(children).map((child, i) =>
						i === 1 ? (
							<Fragment key="divider">
								<Divider {...getGutterProps("column", 1)} />
								{child}
							</Fragment>
						) : (
							child
						)
					)}
				</div>
			)}
		/>
	);
};
