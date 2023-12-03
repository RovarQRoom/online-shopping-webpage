import type { Items } from '$lib/Models/Entities/Items.entities.model';
import type { CreateItemRequest } from '$lib/Models/Requests/CreateItem.Request';
import { databases } from '$lib/appwrite/appwrite';
import { appwrite_collection_item, appwrite_database } from '$lib/enviroment/env.enviroment';
import type { IItemsRepository } from '../Interface/I.Items.repository';

export class ItemsRepository implements IItemsRepository {
	createItem(item: CreateItemRequest) {
		throw new Error('Method not implemented.');
	}
	async getItems(): Promise<AppwriteResponse<Items>> {
		let { documents, total } = (await databases.listDocuments(
			appwrite_database,
			appwrite_collection_item,
		)) as AppwriteResponse<Items>;

		console.log("Documents",documents);
		
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
