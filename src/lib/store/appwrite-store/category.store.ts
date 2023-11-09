import type { CategoryDto } from "$lib/Models/DTO/Category.dto.model";
import type { Store } from "$lib/Models/Requests/Store.request.model";
import { databases } from "$lib/appwrite/appwrite";
import { writable } from "svelte/store";

const createCategoryStore = () => {
	// Create a writable store with an initial value of null
	const {subscribe, set, update} = writable<Store<CategoryDto>>({
		data: [],
		total: 0
	});

	return{
		subscribe,
		set: (value: Store<CategoryDto>) => set(value),
		get: async (id: string) => {
			try {
				
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
			let data = await databases.listDocuments("654b2f6a8af9b2ed391f","654b3255bd78819c3e8d");
			console.log("Hello There Data Card",data);
			
            let dto:CategoryDto[] = data.documents.map(document=>{
                return{
                    id:document.$id,
                    name:document.name,
                    description:document.discription,
                    category_image:document.categoryImage
                }
				
            });
            set({data:dto,total:data.total});
			} catch (e) {
				console.log('Error:', e);
			}
		}
	}
};

export const categoryStore = createCategoryStore();
