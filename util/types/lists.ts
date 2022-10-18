export interface Page<T> {
	cursor: number | null;
	hasMore: boolean;
	data: T[];
}
