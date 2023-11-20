import type { Categories } from '$lib/Models/Entities/Categories.entity.model';
import { databases } from '$lib/appwrite/appwrite';
import { appwrite_database, appwrite_collection_category } from '$lib/enviroment/env.enviroment';
import type { ICategoriesRepository } from '$lib/Repositories/Interface/I.Category.repository';

export class CategoriesRepository implements ICategoriesRepository {
	async getCategories(): Promise<AppwriteResponse<Categories>> {
		let { documents, total } = (await databases.listDocuments(
			appwrite_database,
			appwrite_collection_category
		)) as AppwriteResponse<Categories>;

		return { documents, total };
	}
	async getCategory(id: string): Promise<Categories> {
		let document = (await databases.getDocument(
			appwrite_database,
			appwrite_collection_category,
			id
		)) as Categories;

		return document;
	}
}
