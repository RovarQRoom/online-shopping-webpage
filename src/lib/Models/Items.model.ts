import type { Timestamp } from 'firebase/firestore';

export interface Items {
	id: string;
	categorys: Category_Details[];
	user_id: string;
	name: string;
	price: number;
	detail: string;
	popularity: number;
	production_date: Timestamp;
	expired_date: Timestamp;
	quantity: number;
	item_image: string;
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}

export interface Category_Details {
	value: string;
	label: string;
}
