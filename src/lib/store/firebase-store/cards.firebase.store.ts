import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
	type OrderByDirection,
	orderBy,
	limit,
	startAfter
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { Card } from '../../DTO';
import { database } from '../../firebase/firebase';

type StoreValue = {
	cards: Card[];
	total: number;
};

// Create a writable store with an initial value of null
const cardsWritable = writable<StoreValue>({
	cards: [],
	total: 0
});
export const cardsCollection = collection(database, 'cards');
const cardsPerPage = 5;

export const cardsHandlers = {
	getCard: async (id: string) => {
		try {
			const docRef = doc(cardsCollection, id);
			const docSnap = await getDoc(docRef);

			return docSnap.data();
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getCards: async (page?: number, filter?: string, ascending?: boolean) => {
		try {
			// Initialize an empty array to store the item data
			const cardData: Card[] = [];

			const orderCondition: OrderByDirection = ascending ? 'asc' : 'desc';

			// Calculate the offset based on the page number and items per page
			const offset = ((page || 0) - 1) * cardsPerPage;

			// Get the starting document for the current page
			let startDoc: any = null;
			if (offset > 0) {
				const startDocQuery = query(
					cardsCollection,
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
						cardsCollection,
						where('deleted_at', '==', null),
						orderBy(filter || 'webpage_url', orderCondition),
						startAfter(startDoc),
						limit(cardsPerPage)
				  )
				: query(
						cardsCollection,
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
							id: doc.id
						},
						doc.data()
					) as Card
				);
			});

			// Get the total count of items
			const totalCount = await cardsHandlers.getDocSize();

			// Calculate the total number of pages
			const totalPages = Math.ceil(totalCount / cardsPerPage);

			// Set the item data to the writable store
			cardsWritable.set({ cards: cardData, total: totalCount });

			console.log('Card Data', cardData);

			return {
				cardsData: cardData,
				totalPages
			};
		} catch (e) {
			console.log('Error:', e);
		}
	},
	getDocSize: async () => {
		const querySnapshot = query(cardsCollection, where('deleted_at', '==', null));
		const snapshot = await getDocs(querySnapshot);
		return snapshot.size;
	},
	getAllCards: async () => {
		try {
			const categoryData: Card[] = [];
			const querySnapshot = await getDocs(query(cardsCollection));
			querySnapshot.forEach((doc) => {
				categoryData.push(
					Object.assign(
						{
							id: doc.id
						},
						doc.data()
					) as Card
				);
			});

			return categoryData;
		} catch (e) {
			console.log('Error :', e);
		}
	}
};

export default cardsWritable;
