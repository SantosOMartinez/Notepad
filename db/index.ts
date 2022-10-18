import { openDB } from "idb";

import { DB, NotesDBV1, NotesSchema } from "@type/db";

const version = 1;

/**
 * Database handler for IndexDB api used in the application.
 */
export class Database {
	/**
	 * Versions being used in all databases.
	 */
	private version: number;
	/**
	 * Databases in the system.
	 */
	private db: NotesSchema;

	/**
	 *  Access application databases using IndexDB.
	 * @param version version of the database.
	 */
	constructor(version = 1) {
		this.version = version;
		this.db = null;
		this.connect();
	}

	/**
	 * Connect all databases.
	 */
	public async connect() {
		this.db = await this.notesDB();
	}

	//-----[Getters]-----

	/**
	 * Get an instance of the notes database.
	 */
	get notes(): typeof this.db {
		return this.db;
	}

	//-----[Database Fetchers]-----

	private async notesDB() {
		if (this.db !== null) return this.db;

		return await openDB<NotesDBV1>(DB.Notes, this.version, {
			upgrade: (db) => {
				const store = db.createObjectStore("notes", {
					keyPath: "id",
				});
				store.createIndex("by_id", "id");
				store.createIndex("updated_at", "updated_at");
				store.createIndex("created_at", "created_at");
				store.createIndex("by_location", "location", { unique: false });
			},
		});
	}
}

/**
 * Access application databases using IndexDB.
 */
const db = new Database(version);

export default db;
