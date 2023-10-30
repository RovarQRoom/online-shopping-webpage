import type { Orders } from './Order.model';
import type { Order_Items } from './Order_Items.model';
import type { Datetime } from './Extention/Datetime.extention.model';

export interface Orders_History extends Datetime {
	id: string;
	order: Orders;
	order_items: Order_Items[];
	history?: Orders_History[];
}
