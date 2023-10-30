
import type { Datetime } from './Extention/Datetime.extention.model';

export interface Category extends Datetime {
	id: string;
	user_id: string;
	name: string;
	description: string;
	category_image: string;
}
