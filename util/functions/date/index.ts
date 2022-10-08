/**
 * Formats a date.
 *
 * @param d date to format.
 * @param locales Local to format by. (default local)
 * @param options
 * @returns Formatted version of the date.
 */
export const formatDate = (
	d: Date | number,
	locales?: string | string[],
	options?: Intl.DateTimeFormatOptions
) => new Intl.DateTimeFormat(locales, options).format(d);

/**
 * Formats a date to only give the time
 *
 * @param date Date to fomat
 * @returns Time format HH:MM AM/PM
 */
export const formatTime = (date: Date) =>
	date.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

export const timeAgo = (date: Date) => {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const delta = Date.now() - date.getTime();

	if (delta < second) {
		return "just now"; // TODO: Make this better
	} else if (delta < minute) {
		return `${Math.floor(delta / second)}s`;
	} else if (delta < hour) {
		return `${Math.floor(delta / minute)}m`;
	} else if (delta < day) {
		return `${Math.floor(delta / hour)}h`;
	}

	return formatDate(date, undefined, {
		dateStyle: "medium",
	});
};

const toTimestamp = (date: Date) => {
	const day = 60 * 60 * 24 * 1000;
	const now = Date.now();
	const diff = now - date.getTime();

	if (diff <= 1) {
		return formatTime(date);
	} else if (diff / day <= 2) {
		return "yesterday";
	} else if (diff / day <= 7) {
		return date.toLocaleString("en-US", {
			weekday: "long",
		});
	}
	return date.toLocaleString("en-US", {
		dateStyle: "short",
	});
};

export default toTimestamp;
