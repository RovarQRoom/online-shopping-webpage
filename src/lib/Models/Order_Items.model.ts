import type { Datetime } from '$lib/Models/Extensions/Datetime.Extention.Model';

export interface Order_Items extends Datetime {
	id: string;
	item_image: string;
	item_name: string;
	item_uid: string;
	order_uid: string;
	price: number;
	quantity: number;
}
