import type { Items } from "$lib/Models/Entities/Items.entities.model";
import type { Result } from "$lib/Models/Results/Database.result.model";

export interface IItemsRepository{
    getItems(): Promise<Result<Items>>;
    getItem(id: string): Promise<Items>;
}