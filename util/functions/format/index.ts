const numberFormatter = Intl.NumberFormat("en-us", {
	notation: "compact",
});

export const formatNumber = (n: number | bigint) => numberFormatter.format(n);
