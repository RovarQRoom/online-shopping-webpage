import { Dto } from '$lib/Models/Conversion/Conversion.model';
import type { CategoryDto } from '$lib/Models/DTO/Category.dto.model';
import type { Store } from '$lib/Models/Requests/Store.request.model';
import { CategoriesRepository } from '$lib/Repositories/Implementation/Categories.repository';
import { writable } from 'svelte/store';

const categoriesRepository = new CategoriesRepository();

const createCategoryStore = () => {
	// Create a writable store with an initial value of null
	const { subscribe, set, update } = writable<Store<CategoryDto>>({
		data: [],
		total: 0
	});

	return {
		subscribe,
		set: (value: Store<CategoryDto>) => set(value),
		get: async (id: string) => {
			try {
				let document = await categoriesRepository.getCategory(id);

				let dto: CategoryDto = Dto.ToCategoriesDto(document);

				return dto;
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
				let { documents, total } = await categoriesRepository.getCategories();

				let dto: CategoryDto[] = documents.map((document) => {
					return Dto.ToCategoriesDto(document);
				});
				set({ data: dto, total: total });
			} catch (e) {
				console.log('Error:', e);
			}
		}
	};
};

export const categoryStore = createCategoryStore();
