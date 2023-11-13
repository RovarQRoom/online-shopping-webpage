import type { Items } from '$lib/Models/Entities/Items.entities.model';
import { databases } from '$lib/appwrite/appwrite';
import { appwrite_collection_item, appwrite_database } from '$lib/enviroment/env.enviroment';
import type { IItemsRepository } from '../Interface/I.Items.repository';

export class ItemsRepository implements IItemsRepository {
	async getItems(): Promise<AppwriteResponse<Items>> {
		let { documents, total } = (await databases.listDocuments(
			appwrite_database,
			appwrite_collection_item,
		)) as AppwriteResponse<Items>;

		return { documents, total };
	}
	async getItem(id: string): Promise<Items> {
		let document = (await databases.getDocument(
			appwrite_database,
			appwrite_collection_item,
			id
		)) as Items;

		return document;
	}
}
