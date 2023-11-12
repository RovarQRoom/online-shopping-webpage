import type { Items } from '$lib/Models';
import { databases } from '$lib/appwrite/appwrite';
import type { IItemsRepository } from '../Interface/I.Items.repository';


export class ItemsRepository implements IItemsRepository {
    async getItems(): Promise<Items[]> {
        let data = await databases.listDocuments('654b2f6a8af9b2ed391f', '654b2f8078d73f2fae55');
        throw new Error('Method not implemented.');
    }
    async getItem(id: string): Promise<Items> {
        throw new Error('Method not implemented.');
    }

}