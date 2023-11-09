import type { FavouriteDto } from "$lib/Models/DTO/Favorite.dto.model";
import type { Store } from "$lib/Models/Requests/Store.request.model";
import { databases } from "$lib/appwrite/appwrite";
import { ID } from "appwrite";
import { writable } from "svelte/store";

const createFavouriteStore = () => {
	// Create a writable store with an initial value of null
	const {subscribe, set, update} = writable<FavouriteDto>();

	return{
		subscribe,
		set: (value: FavouriteDto) => set(value),
		get: async (id: string) => {
			try {
				
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
			let data = await databases.getDocument("654b2f6a8af9b2ed391f","654b336d304a52b54f08","654b705f12636aed6717");
			console.log("Hello There Data favourite",data);
                let dto:FavouriteDto = {
                    id:data.$id,
                    items_id:data.itemsId,
                    items_names:data.itemsName
                }
            
				
            set(dto);
			} catch (e) {
				console.log('Error:', e);
			}
		}
	}
};

export const favouriteStore = createFavouriteStore();
