import { insert, insertInPlace } from "./";

test("Value is inserted in place.", () => {
	const answer = [1, 2, 3];

	const list = [1, 3];
	const index = 1;
	const item = 2;

	const capture = list;
	insertInPlace(list, index, item);

	expect(list).toEqual(answer);
	expect(capture).toBe(list);
	expect(capture).toEqual(answer);
});

test("Original list is not changed.", () => {
	const answer = [1, 2, 3];

	const list = [1, 3];
	const index = 1;
	const item = 2;

	const result = insert(list, index, item);

	expect(list).not.toEqual(answer);
	expect(result).not.toBe(list);
	expect(result).not.toEqual(list);

	expect(result).toEqual(answer);
});
