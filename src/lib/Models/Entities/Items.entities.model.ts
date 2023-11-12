import type { Categories } from "./Categories.entity.model";

export interface Items{
    userId: string;
    name: string;
    price: number;
    itemImage: string;
    productionDate: Date;
    expiredDate: Date;
    quantity: number;
    detail: string;
    popularity: number;
    $id: string;
    $createdAt: Date;
    $updatedAt: Date;
    $permissions: [];
    category: Categories;
    $databaseId: string;
    $collectionId: string;
}