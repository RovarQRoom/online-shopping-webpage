import {
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
	type OrderByDirection
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import { items_collection } from '$lib/firebase/firebase';
import type { Store } from '$lib/Models/Requests/Store.request.model';
import type { ItemsDto } from '$lib/Models/DTO/Items.dto.model';

const itemsPerPage = 10;
const collection = items_collection;

const createItemsStore = () => {
	const { subscribe, set, update } = writable<Store<ItemsDto>>({ data: [], total: 0 });

	return {
		subscribe,
		set: (value: Store<ItemsDto>) => set(value),
		get: async (id: string) => {
			try {
				const docRef = doc(collection, id);
				const docSnap = await getDoc(docRef);

				const dto:ItemsDto = {
					id: docSnap.id,
					name: docSnap.data()!.name,
					price: docSnap.data()!.price,
					detail: docSnap.data()!.detail,
					popularity: docSnap.data()!.popularity,
					production_date: docSnap.data()!.production_date,
					expired_date: docSnap.data()!.expired_date,
					item_image: docSnap.data()!.item_image,
					categories: docSnap.data()!.categories
				}
				return dto;
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
				// Initialize an empty array to store the item data
				const itemData: ItemsDto[] = [];

				// Set the order condition based on the ascending parameter
				const orderCondition: OrderByDirection = ascending ? 'asc' : 'desc';

				// Calculate the offset based on the page number and items per page
				const offset = ((page || 0) - 1) * itemsPerPage;

				// Get the starting document for the current page
				let startDoc: any = null;
				if (offset > 0) {
					const startDocQuery = query(
						collection,
						where('deleted_at', '==', null),
						orderBy(filter || 'name', orderCondition),
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
							orderBy(filter || 'name', orderCondition),
							startAfter(startDoc),
							limit(8)
					  )
					: query(
							collection,
							where('deleted_at', '==', null),
							orderBy(filter || 'name', orderCondition),
							limit(8)
					  );

				// Get the documents from the query condition
				const querySnapshot = await getDocs(queryCondition);
				querySnapshot.forEach((doc) => {
					itemData.push(
						Object.assign(
							{
								id: doc.id,
								name: doc.data()!.name,
								price: doc.data()!.price,
								detail: doc.data()!.detail,
								popularity: doc.data()!.popularity,
								production_date: doc.data()!.production_date,
								expired_date: doc.data()!.expired_date,
								item_image: doc.data()!.item_image,
								categories: doc.data()!.categories
							}
						) as ItemsDto
					);
				});

				// Get the total count of items
				const totalCount = await itemsStore.getDocSize();

				// Calculate the total number of pages
				const totalPages = Math.ceil(totalCount / itemsPerPage);

				// Set the item data to the writable store
				set({ data: itemData, total: totalCount });

				return {
					itemData,
					totalPages
				};
			} catch (e) {
				console.log('Error:', e);
			}
		},
		// A helper function to get the size of a collection
		getDocSize: async () => {
			const querySnapshot = query(collection, where('deleted_at', '==', null));
			const snapshot = await getDocs(querySnapshot);

			return snapshot.size;
		}
	};
};

export const itemsStore = createItemsStore();
