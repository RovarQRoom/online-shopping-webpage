import type { Category } from '$lib/Models/Entities/Categories.entity.model';
import { databases } from '$lib/appwrite/appwrite';
import { appwrite_database, appwrite_collection_category } from '$lib/enviroment/env.enviroment';
import type { ICategoriesRepository } from '$lib/Repositories/Interface/I.Category.repository';
import { Query } from 'appwrite';

export class CategoriesRepository implements ICategoriesRepository {
	updateCategory(document: Category) {
		throw new Error('Method not implemented.');
	}
	async getCategories(): Promise<AppwriteResponse<Category>> {
		let { documents, total } = (await databases.listDocuments(
			appwrite_database,
			appwrite_collection_category,
			[
				Query.isNull('deletedAt')
			]
		)) as AppwriteResponse<Category>;

		return { documents, total };
	}
	async getCategory(id: string): Promise<Category> {
		let document = (await databases.getDocument(
			appwrite_database,
			appwrite_collection_category,
			id
		)) as Category;

		
		return document;
	}

	
}
