import {
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
import type { Category } from '../../Models';
import { database } from '../../firebase/firebase';
type StoreValue = {
	categories: Category[];
	total: number;
};
// Create a writable store with an initial value of null
const categoryWritable = writable<StoreValue>({
	categories: [],
	total: 0
});
const categoriesPerPage = 5;
export const categoriesCollection = collection(database, 'categories');

export const categoryHandlers = {
	getCategory: async (id: string) => {
		try {
			const docRef = doc(categoriesCollection, id);
			const docSnap = await getDoc(docRef);

			return docSnap.data() as Category;
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getCategories: async (page?: number, filter?: string, ascending?: boolean) => {
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
					categoriesCollection,
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
						categoriesCollection,
						where('deleted_at', '==', null),
						orderBy(filter || 'name', orderCondition),
						startAfter(startDoc),
						limit(categoriesPerPage)
				  )
				: query(
						categoriesCollection,
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
			const totalCount = await categoryHandlers.getDocSize();

			// Calculate the total number of pages
			const totalPages = Math.ceil(totalCount / categoriesPerPage);

			// Set the item data to the writable store
			categoryWritable.set({ categories: categoryData, total: totalCount });

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
		const querySnapshot = query(categoriesCollection, where('deleted_at', '==', null));
		const snapshot = await getDocs(querySnapshot);
		return snapshot.size;
	},
	getAllCategories: async () => {
		try {
			const categoryData: Category[] = [];
			const querySnapshot = await getDocs(query(categoriesCollection));
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

			return categoryData;
		} catch (e) {
			console.log('Error :', e);
		}
	}
};

export default categoryWritable;
