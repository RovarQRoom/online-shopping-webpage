import type { Items } from "$lib/Models";

export interface IItemsRepository{
    getItems(): Promise<Items[]>;
    getItem(id: string): Promise<Items>;
}