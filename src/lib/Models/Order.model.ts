import type { Datetime } from './Extention/Datetime.extention.model';

export interface Orders extends Datetime {
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
}
