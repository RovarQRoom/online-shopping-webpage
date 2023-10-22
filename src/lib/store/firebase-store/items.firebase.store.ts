import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
	startAfter,
	where,
	type OrderByDirection,
	updateDoc
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { Items } from '../../DTO';
import { database } from '../../firebase/firebase';

type StoreValue = {
	items: Items[];
	total: number;
};

// Create a writable store with an initial value of null
const itemsWritable = writable<StoreValue>({ items: [], total: 0 });
const itemsPerPage = 10;
export const itemsCollection = collection(database, 'items');

export const itemsHandlers = {
	getItem: async (id: string) => {
		try {
			const docRef = doc(itemsCollection, id);
			const docSnap = await getDoc(docRef);

			return docSnap.data() as Items;
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getItems: async (page?: number, filter?: string, ascending?: boolean) => {
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
					itemsCollection,
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
						itemsCollection,
						where('deleted_at', '==', null),
						orderBy(filter || 'name', orderCondition),
						startAfter(startDoc),
						limit(8)
				  )
				: query(
						itemsCollection,
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
			const totalCount = await itemsHandlers.getDocSize();

			// Calculate the total number of pages
			const totalPages = Math.ceil(totalCount / itemsPerPage);

			// Set the item data to the writable store
			itemsWritable.set({ items: itemData, total: totalCount });

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
		const querySnapshot = query(itemsCollection, where('deleted_at', '==', null));
		const snapshot = await getDocs(querySnapshot);

		return snapshot.size;
	},

	getAllItems: async () => {
		try {
			// Initialize an empty array to store the item data
			const itemData: any[] = [];

			// Get the documents from the query condition
			const querySnapshot = await getDocs(itemsCollection);
			querySnapshot.forEach((doc) => {
				itemData.push(
					Object.assign(
						{
							id: doc.id,
							created_at: doc.data().created_at,
							updated_at: doc.data().updated_at,
							deleted_at: doc.data().deleted_at
						},
						doc.data()
					) as Items
				);
			});

			return itemData;
		} catch (e) {
			console.log('Error:', e);
		}
	},
	getItemsByPopularity: async () => {
		try {
			const itemsData: Items[] = [];
			const querySnapshot = await getDocs(
				query(
					itemsCollection,
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

export default itemsWritable;
