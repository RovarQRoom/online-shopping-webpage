import type { Timestamp } from 'firebase/firestore';

export interface Users{
	id: string;
	name?: string;
	email?: string;
	phone: string;
	gender?: string;
	imgUrl?: string;
	birthday?: Timestamp;
	roles?: string[];
}
