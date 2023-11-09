import type { CardDto } from "$lib/Models/DTO/Card.dto.model";
import type { Store } from "$lib/Models/Requests/Store.request.model";
import { databases } from "$lib/appwrite/appwrite";
import { writable } from "svelte/store";

const createCartsStore = () => {
	// Create a writable store with an initial value of null
	const {subscribe, set, update} = writable<Store<CardDto>>({
		data: [],
		total: 0
	});

	return{
		subscribe,
		set: (value: Store<CardDto>) => set(value),
		get: async (id: string) => {
			try {
				
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
			let data = await databases.listDocuments("654b2f6a8af9b2ed391f","654b3405853b2ef8aa7e");
			console.log("Hello There Data Card",data);
			
            let dto:CardDto[] = data.documents.map(document=>{
                return{
                    id:document.$id,
                    webpage_url:document.webpageUrl,
                    image_url:document.imageUrl,
                    expiration_date:document.expirationDate
                }
				
            });
            set({data:dto,total:data.total});
			} catch (e) {
				console.log('Error:', e);
			}
		}
	}
};

export const cardsStore = createCartsStore();
