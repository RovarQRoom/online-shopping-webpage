import {
	doc,
	getDoc,
	getDocs,
	query,
	where,
	type OrderByDirection,
	orderBy,
	limit,
	startAfter
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import { cards_collection } from '$lib/firebase/firebase';
import type { CardDto } from '$lib/Models/DTO/Card.dto.model';
import type { Store } from '$lib/Models/Requests/Store.request.model';


const cardsPerPage = 5;
const collection = cards_collection;

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
				const docRef = doc(collection, id);
				const docSnap = await getDoc(docRef);
	
				return docSnap.data();
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
				// Initialize an empty array to store the item data
				const cardData: CardDto[] = [];
	
				const orderCondition: OrderByDirection = ascending ? 'asc' : 'desc';
	
				// Calculate the offset based on the page number and items per page
				const offset = ((page || 0) - 1) * cardsPerPage;
	
				// Get the starting document for the current page
				let startDoc: any = null;
				if (offset > 0) {
					const startDocQuery = query(
						collection,
						where('deleted_at', '==', null),
						orderBy(filter || 'webpage_url', orderCondition),
						limit(offset)
					);
					const startDocSnapshot = await getDocs(startDocQuery);
					startDoc = startDocSnapshot.docs[startDocSnapshot.docs.length - 1];
				}
	
				// Initialize the query condition with the startAfter parameter if the startDoc exists
				const queryCondition = startDoc
					? query(
							collection,
							where('deleted_at', '==', null),
							orderBy(filter || 'webpage_url', orderCondition),
							startAfter(startDoc),
							limit(cardsPerPage)
					  )
					: query(
							collection,
							where('deleted_at', '==', null),
							orderBy(filter || 'webpage_url', orderCondition),
							limit(cardsPerPage)
					  );
	
				// Get the documents from the query condition
				const querySnapshot = await getDocs(queryCondition);
				querySnapshot.forEach((doc) => {
					cardData.push(
						Object.assign(
							{
								id: doc.id,
								webpage_url: doc.data().webpage_url,
								image_url: doc.data().image_url,
								expiration_date: doc.data().expiration_date
							},
						) as CardDto
					);
				});
	
				// Get the total count of items
				const totalCount = await cardsStore.getDocSize();
	
				// Calculate the total number of pages
				const pages = Math.ceil(totalCount / cardsPerPage);
	
				// Set the item data to the writable store
				cardsStore.set({ data: cardData, total: totalCount });
	
				return {
					cards: cardData,
					pages
				};
			} catch (e) {
				console.log('Error:', e);
			}
		},
		getDocSize: async () => {
			const querySnapshot = query(collection, where('deleted_at', '==', null));
			const snapshot = await getDocs(querySnapshot);
			return snapshot.size;
		}
	}
};

export const cardsStore = createCartsStore();
