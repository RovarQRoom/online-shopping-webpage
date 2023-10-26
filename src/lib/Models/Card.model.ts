import type { Timestamp } from 'firebase/firestore';

export interface Card {
	id: string;
	user_id: string;
	webpage_url: string;
	image_url: string;
	expiration_date: Timestamp;
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}