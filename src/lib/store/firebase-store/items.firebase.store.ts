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
import type { Items } from '$lib/Models';
import { items_collection } from '$lib/firebase/firebase';
import type { Store } from '$lib/Models/Requests/Store.request.model';

const itemsPerPage = 10;
const collection = items_collection;

export const createItemsStore = () => {
	const { subscribe, set, update } = writable<Store<Items>>({ data: [], total: 0 });

	return {
		subscribe,
		set: (value: Store<Items>) => set(value),
		get: async (id: string) => {
			try {
				const docRef = doc(collection, id);
				const docSnap = await getDoc(docRef);

				return docSnap.data() as Items;
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
				// Initialize an empty array to store the item data
				const itemData: Items[] = [];

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
								id: doc.id
							},
							doc.data()
						) as Items
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
		},
		getItemsByPopularity: async () => {
			try {
				const itemsData: Items[] = [];
				const querySnapshot = await getDocs(
					query(
						collection,
						where('deleted_at', '==', null),
						orderBy('popularity', 'desc'),
						limit(5)
					)
				);
				querySnapshot.forEach((doc) => {
					itemsData.push(
						Object.assign(
							{
								id: doc.id
							},
							doc.data()
						) as Items
					);
				});
				return itemsData;
			} catch (e) {
				console.log('Error :', e);
			}
		}
	};
};

export const itemsStore = createItemsStore();
