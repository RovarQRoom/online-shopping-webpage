import type { Timestamp } from 'firebase/firestore';

export interface Orders {
	id: string;
	client_uid: string;
	total_amount: number;
	status: string;
	address: {
		building: string;
		buildingType: string;
		lat: string;
		lng: string;
		note: string;
		street: string;
	};
	created_at: Timestamp;
	updated_at: Timestamp | null;
	deleted_at: Timestamp | null;
}
