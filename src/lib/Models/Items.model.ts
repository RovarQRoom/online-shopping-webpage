import type { Timestamp } from 'firebase/firestore';
import type { Datetime } from './Extention/Datetime.extention.model';

export interface Items extends Datetime{
	id: string;
	categories: Category_Details[];
	user_id: string;
	name: string;
	price: number;
	detail: string;
	popularity: number;
	production_date: Timestamp;
	expired_date: Timestamp;
	quantity: number;
	item_image: string;
}

export interface Category_Details {
	id: string;
	label: string;
}
