import type { Datetime } from './Extention/Datetime.extention.model';

export interface Order_Items extends Datetime {
	id: string;
	item_image: string;
	item_name: string;
	item_uid: string;
	order_uid: string;
	price: number;
	quantity: number;
}
