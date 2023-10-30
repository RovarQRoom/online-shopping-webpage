import type { Timestamp } from "firebase/firestore";

export interface Datetime {
    created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}