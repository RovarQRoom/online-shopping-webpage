import type { Timestamp } from 'firebase/firestore';

export interface Order_Items {
	id: string;
	item_image: string;
	item_name: string;
	item_uid: string;
	order_uid: string;
	price: number;
	quantity: number;
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}
