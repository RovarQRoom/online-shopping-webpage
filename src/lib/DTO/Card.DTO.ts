import type { Timestamp } from 'firebase/firestore';

export interface Card {
	id?: string;
	userId: string;
	webpage_url: string;
	image_url: string;
	expiration_date: Timestamp;
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}