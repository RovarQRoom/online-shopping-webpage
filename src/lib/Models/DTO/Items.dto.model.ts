import type { Timestamp } from 'firebase/firestore';
import type { Category } from '../Category.model';

export interface ItemsDto{
	id: string;
	categories: Category_Details[]
	name: string;
	price: number;
	detail: string;
	popularity: number;
	production_date: Timestamp;
	expired_date: Timestamp;
	item_image: string;
	quantity:number;
}

export interface Category_Details {
	id: string;
	label: string;
}
