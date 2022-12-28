import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { dbState } from "@state/db";

import db from "./";
import dbQueries from "./fetch";

export const useDB = () => {
	const [database, setDatabase] = useRecoilState(dbState);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error>(null);

	useEffect(() => {
		if (database) return setLoading(false);

		const load = async () => {
			try {
				await db.connect();
				setDatabase(db);
			} catch (err) {
				setError(err);
			}
		};
		load();
	}, []);

	useEffect(() => {
		setLoading(!database);
	}, [database]);

	return { db: database, loading, error };
};

export const useDBQueries = () => {
	const { db } = useDB();

	const isConnected = !!db?.notes;

	return {
		...dbQueries(db),
		isConnected,
	};
};
