import type { CardDto } from "$lib/Models/DTO/Card.dto.model";
import type { Store } from "$lib/Models/Requests/Store.request.model";
import { CardRepository } from "$lib/Repositories/Implementation/Cards.Repository";
import { databases } from "$lib/appwrite/appwrite";
import { Query } from "appwrite";
import { writable } from "svelte/store";

const cardsRepository = new CardRepository();

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
			let {documents,total} = await cardsRepository.getCards();
			console.log("Hello There Data Card",documents);
			
            let dto:CardDto[] = documents.map(document=>{
                return{
					id:document.$id as string,
                    webpageUrl:document.webpageUrl as string,
                    cardImage:document.cardImage,
                }
				
            });
            set({data:dto,total});
			} catch (e) {
				console.log('Error:', e);
			}
		}
	}
};

export const cardsStore = createCartsStore();
