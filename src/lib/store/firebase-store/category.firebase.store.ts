import {
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
	type OrderByDirection,
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { Category } from '$lib/Models';
import { category_collection } from '$lib/firebase/firebase';
import type { Store } from '$lib/Models/Requests/Store.request.model';

const categoriesPerPage = 5;
const collection = category_collection;

const createCategoryStore = () => {
	const { subscribe, set, update } = writable<Store<Category>>({
		data: [],
		total: 0
	});

	return{
		subscribe,
		set: (value: Store<Category>) => set(value),
		get: async (id: string) => {
			try {
				const docRef = doc(collection, id);
				const docSnap = await getDoc(docRef);
	
				return docSnap.data() as Category;
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async (page?: number, filter?: string, ascending?: boolean) => {
			try {
				// Initialize an empty array to store the item data
				const categoryData: Category[] = [];
	
				const orderCondition: OrderByDirection = ascending ? 'asc' : 'desc';
	
				// Calculate the offset based on the page number and items per page
				const offset = ((page || 0) - 1) * categoriesPerPage;
	
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
							limit(categoriesPerPage)
					  )
					: query(
							collection,
							where('deleted_at', '==', null),
							orderBy(filter || 'name', orderCondition),
							limit(categoriesPerPage)
					  );
	
				// Get the documents from the query condition
				const querySnapshot = await getDocs(queryCondition);
				querySnapshot.forEach((doc) => {
					categoryData.push(
						Object.assign(
							{
								id: doc.id
							},
							doc.data()
						) as Category
					);
				});
	
				// Get the total count of items
				const totalCount = await categoryStore.getDocSize();
	
				// Calculate the total number of pages
				const totalPages = Math.ceil(totalCount / categoriesPerPage);
	
				// Set the item data to the writable store
				set({ data: categoryData, total: totalCount });

				console.log("categoryData: ", categoryData);
				
	
				return {
					categoryData,
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
	}
};

export const categoryStore = createCategoryStore();
