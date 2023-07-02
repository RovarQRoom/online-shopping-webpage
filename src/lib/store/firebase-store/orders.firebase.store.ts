import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
	type OrderByDirection,
	limit,
	startAfter,
	updateDoc,
	serverTimestamp
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { Orders } from '../../DTO';
import { database } from '../../firebase/firebase';

// Create a writable store with an initial value of null
type StoreValue = {
	orders: Orders[];
	total: number;
};

const ordersWritable = writable<StoreValue>({
	orders: [],
	total: 0
});
const ordersPerPage = 10;
export const ordersCollection = collection(database, 'orders');
const orderUsers = collection(database, 'users');

export const orderHandlers = {
	getOrder: async (id: string) => {
		try {
			const docRef = doc(ordersCollection, id);
			const docSnap = await getDoc(docRef);

			return docSnap.data();
		} catch (e) {
			console.log('Error in Orders Store :', e);
		}
	},
	getOrders: async (
		page?: number,
		filter?: string,
		filterByColor?: string,
		ascending?: boolean
	) => {
		try {
			const orderCondition: OrderByDirection = ascending ? 'asc' : 'desc';

			// Calculate the offset based on the page number and items per page
			const offset = ((page || 0) - 1) * ordersPerPage;

			let startDoc: any = null;
			if (offset > 0) {
				const startDocQuery = query(
					ordersCollection,
					where('deleted_at', '==', null),
					orderBy(filter || 'status', orderCondition),
					limit(offset)
				);
				const startDocSnapshot = await getDocs(startDocQuery);
				startDoc = startDocSnapshot.docs[startDocSnapshot.docs.length - 1];
			}

			// Initialize the query condition with the startAfter parameter if the startDoc exists
			let queryCondition = startDoc
				? query(
						ordersCollection,
						where('deleted_at', '==', null),
						orderBy(filter || 'status', orderCondition),
						startAfter(startDoc),
						limit(ordersPerPage)
				  )
				: query(
						ordersCollection,
						where('deleted_at', '==', null),
						orderBy(filter || 'status', orderCondition),
						limit(ordersPerPage)
				  );

			if (filterByColor) {
				queryCondition = query(
					ordersCollection,
					where('deleted_at', '==', null),
					where('status', '==', filterByColor)
				);
			} else {
				queryCondition = query(
					ordersCollection,
					where('deleted_at', '==', null),
					orderBy('created_at', 'asc')
				);

				if (filter) {
					queryCondition = query(
						ordersCollection,
						where('deleted_at', '==', null),
						orderBy(filter, orderCondition as OrderByDirection)
					);
				}
			}

			// Get the total count of items
			const totalCount = await orderHandlers.getDocSize();

			// Calculate the total number of pages
			const totalPages = Math.ceil(totalCount / ordersPerPage);

			onSnapshot(queryCondition, (querySnapshot) => {
				const ordersData: Orders[] = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					client_uid: doc.data().client_uid,
					total_amount: doc.data().total_amount,
					status: doc.data().status,
					address: doc.data().address,
					created_at: doc.data().created_at,
					updated_at: doc.data().updated_at,
					deleted_at: doc.data().deleted_at
				}));

				ordersWritable.set({ orders: ordersData, total: totalCount });
			});

			return { totalPages };
		} catch (err) {
			console.log('error', err);
		}
	},
	// A helper function to get the size of a collection
	getDocSize: async () => {
		const querySnapshot = query(ordersCollection, where('deleted_at', '==', null));
		const snapshot = await getDocs(querySnapshot);

		return snapshot.size;
	},
	getAllOrders: async () => {
		try {
			const ordersData: Orders[] = [];
			const queryCondition = query(ordersCollection);

			const querySnapshot = await getDocs(queryCondition);
			querySnapshot.forEach((doc) => {
				ordersData.push(
					Object.assign(
						{
							id: doc.id
						},
						doc.data()
					) as Orders
				);
			});

			return ordersData;
		} catch (err) {
			console.log('error', err);
		}
	}
};

export default ordersWritable;
