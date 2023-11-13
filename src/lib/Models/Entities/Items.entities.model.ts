import type { Database } from "../Extention/Database.extention.model";
import type { Categories } from "./Categories.entity.model";

export interface Items extends Database{
    userId: string;
    name: string;
    price: number;
    itemImage: string;
    productionDate: Date;
    expiredDate: Date;
    quantity: number;
    detail: string;
    popularity: number;
    category: Categories;
}