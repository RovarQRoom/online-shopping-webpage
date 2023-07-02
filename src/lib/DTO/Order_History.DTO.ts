import type { Timestamp } from 'firebase/firestore';
import type { Order_Items } from './Order_Items.DTO';
import type { Orders } from './Order.DTO';

export interface Orders_History {
	id?: string;
	order: Orders;
	order_items: Order_Items[];
	history?: Orders_History[];
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}
