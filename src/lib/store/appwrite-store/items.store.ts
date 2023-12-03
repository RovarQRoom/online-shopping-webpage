import { Dto } from '$lib/Models/Conversion/Conversion.model';
import type { ItemsDto } from '$lib/Models/DTO/Items.dto.model';
import type { Store } from '$lib/Models/Requests/Store.request.model';
import { ItemsRepository } from '$lib/Repositories/Implementation/Items.repository';
import { writable } from 'svelte/store';

const itemsRepository = new ItemsRepository();

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
				let document = await itemsRepository.getItem(id);

				let dto: ItemsDto = Dto.ToItemDto(document);

				return dto;
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
				let { documents, total } = await itemsRepository.getItems();

				let dto: ItemsDto[] = documents.map((document) => {
					return Dto.ToItemDto(document);
				});

				set({ data: dto, total: total });
			} catch (e) {
				console.log('Error:', e);
			}
		}

		
	};
};

export const ItemsStore = createItemsStore();
