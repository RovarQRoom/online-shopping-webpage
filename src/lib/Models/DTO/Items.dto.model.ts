import type { Timestamp } from 'firebase/firestore';

export interface ItemsDto{
	id: string;
	categories: Category_Details[];
	name: string;
	price: number;
	detail: string;
	popularity: number;
	production_date: Timestamp;
	expired_date: Timestamp;
	item_image: string;
}

export interface Category_Details {
	id: string;
	label: string;
}
