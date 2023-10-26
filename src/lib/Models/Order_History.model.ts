import type { Timestamp } from 'firebase/firestore';
import type { Orders } from './Order.model';
import type { Order_Items } from './Order_Items.model';

export interface Orders_History {
	id: string;
	order: Orders;
	order_items: Order_Items[];
	history?: Orders_History[];
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}
