import type { Items } from "$lib/Models/Entities/Items.entities.model";

export interface IItemsRepository{
    getItems(): Promise<AppwriteResponse<Items>>;
    getItem(id: string): Promise<Items>;
}