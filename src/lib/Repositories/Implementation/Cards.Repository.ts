import type { Category } from '$lib/Models/Entities/Categories.entity.model';
import { databases } from '$lib/appwrite/appwrite';
import { appwrite_database, appwrite_collection_card } from '$lib/enviroment/env.enviroment';
import type { ICardRepository } from '$lib/Repositories/Interface/I.Card.repository';
import type { Card } from '$lib/Models/Entities/Card.Entities.Model';
import { Query } from 'appwrite';

export class CardRepository implements ICardRepository {
	async getCards(): Promise<AppwriteResponse<Card>> {
		let { documents, total } = (await databases.listDocuments(
			appwrite_database,
			appwrite_collection_card,
			[
				Query.isNull("deletedAt"),
				Query.limit(3)
			  ]
		)) as AppwriteResponse<Card>;

		return { documents, total };
	}
	async getCard(id: string): Promise<Card> {
		let document = (await databases.getDocument(
			appwrite_database,
			appwrite_collection_card,
			id
		)) as Card;

		return document;
	}
}
