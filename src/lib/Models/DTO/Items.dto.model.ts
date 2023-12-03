import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";
import type { CategoryDto } from "$lib/Models/DTO/Category.dto.model";

export interface ItemsDto extends Datetime{
	id: string;
	categories: CategoryDto[] | null;
	name: string;
	price: number;
	detail: string;
	popularity: number;
	productionDate: Date;
	expiredDate: Date;
	itemImage: string;
	quantity:number;
}
