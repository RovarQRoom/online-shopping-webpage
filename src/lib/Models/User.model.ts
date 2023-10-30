import type { Timestamp } from 'firebase/firestore';
import type { Datetime } from './Extention/Datetime.extention.model';

export interface Users extends Datetime {
	id: string;
	name: string;
	email: string;
	phone: string;
	gender?: string;
	imgUrl?: string;
	birthday?: Timestamp;
	role: string[];
}
