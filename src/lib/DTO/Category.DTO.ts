import type { Timestamp } from 'firebase/firestore';

export interface Category {
	id?: string;
	userId: string;
	name: string;
	description: string;
	category_image: string;
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}
