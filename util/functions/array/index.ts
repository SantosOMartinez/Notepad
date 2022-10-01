export function insertInPlace<T>(list: T[], index: number, ...items: T[]) {
	list.splice(index, 0, ...items);
}

export function insert<T>(list: T[], index: number, ...items: T[]) {
	const clone = [...list];
	insertInPlace(clone, index, ...items);
	return clone;
}
