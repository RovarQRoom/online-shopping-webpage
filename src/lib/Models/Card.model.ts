import type { Timestamp } from 'firebase/firestore';
import type { Datetime } from './Extention/Datetime.extention.model';

export interface Card extends Datetime {
	id: string;
	user_id: string;
	webpage_url: string;
	image_url: string;
	expiration_date: Timestamp;
}