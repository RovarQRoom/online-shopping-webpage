import { storage } from '$lib/appwrite/appwrite';
import { ID, type Models } from 'appwrite';
import type { IStorageRepository } from '../Interface/I.Storage.repository';

export class StorageRepository implements IStorageRepository {
	async createFile(file: File): Promise<Models.File> {
		const image = await storage.createFile('6551e25fc56a34070b1d', ID.unique(), file);
        return image;
	}
	async getFile(id: string): Promise<string> {
		const url = storage.getFileView('6551e25fc56a34070b1d', id);
		return url.href;
	}
}
