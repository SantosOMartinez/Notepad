export default interface Note {
	id: string;
	title?: string;
	description?: string;
	locked?: boolean;
	date?: Date;
	image?: string;
	folder?: string;
}
