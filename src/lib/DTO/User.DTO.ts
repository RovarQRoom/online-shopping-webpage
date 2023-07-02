import type { Timestamp } from 'firebase/firestore';

export interface Users {
	id?: string;
	name?: string;
	email?: string;
	phone?: string;
	gender?: string;
	imgUrl?: string;
	birthday?: Timestamp;
	role: {
		id: string;
		name: string;
	};
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}
