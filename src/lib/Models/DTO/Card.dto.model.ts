import type { Timestamp } from "firebase/firestore";

export interface CardDto{
	id: string;
	webpage_url: string;
	image_url: string;
	expiration_date: Timestamp;
}