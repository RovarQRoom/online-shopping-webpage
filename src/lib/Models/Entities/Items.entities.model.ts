import type { Database } from "$lib/Models/Extensions/Database.Extention.Model";
import type { Category } from "./Categories.entity.model";

export interface Items extends Database{
	category: Category[];
    userId: string;
    name: string;
    price: number;
    itemImage: string;
    productionDate: Date;
    expiredDate: Date;
    quantity: number;
    detail: string;
    popularity: number;
}