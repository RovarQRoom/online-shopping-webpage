import type { ItemsDto } from '$lib/Models/DTO/Items.dto.model';
import type { Store } from '$lib/Models/Requests/Store.request.model';
import { databases } from '$lib/appwrite/appwrite';
import { writable } from 'svelte/store';

const createItemsStore = () => {
	// Create a writable store with an initial value of null
	const { subscribe, set, update } = writable<Store<ItemsDto>>({
		data: [],
		total: 0
	});

	return {
		subscribe,
		set: (value: Store<ItemsDto>) => set(value),
		get: async (id: string) => {
			try {
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
				let data = await databases.listDocuments('654b2f6a8af9b2ed391f', '654b2f8078d73f2fae55');
				console.log('Hello There Data Card', data);

				let dto: ItemsDto[] = data.documents.map((document) => {
					return {
						id: document.$id,
						name: document.name,
						item_image: document.itemImage,
						price: document.price,
						detail: document.detail,
						popularity: document.popularity,
						quantity: document.quantity,
						production_date: document.productionDate,
						expired_date: document.expiredDate,
						categories: {
							id: document.category.$id,
							label: document.category.name
						}
					};
				});
				set({ data: dto, total: data.total });
			} catch (e) {
				console.log('Error:', e);
			}
		}
	};
};

export const ItemsStore = createItemsStore();
