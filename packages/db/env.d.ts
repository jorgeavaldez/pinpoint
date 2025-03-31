declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PGHOST: string;
			PGPORT: string;
			PGUSER: string;
			PGPASSWORD: string;
			PGDATABASE: string;
		}
	}
}

export {};
