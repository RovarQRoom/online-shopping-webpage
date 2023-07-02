import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	query,
	updateDoc,
	where
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { Orders_History } from '../../DTO';
import { database } from '../../firebase/firebase';

// Create a writable store with an initial value of null
const orderHistoryWritable = writable<Orders_History[]>([]);
const orderHistoryCollection = collection(database, 'order_history');

export const orderHistoryHandlers = {
	getOrderHistory: async (id: string) => {
		try {
			const docRef = doc(orderHistoryCollection, id);
			const docSnap = await getDoc(docRef);

			return docSnap.data();
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getOrdersHistory: async () => {
		try {
			const orderItemsData: Orders_History[] = [];
			const queryCondition = query(orderHistoryCollection, where('deleted_at', '==', null));
			const querySnapshot = await getDocs(queryCondition);

			querySnapshot.forEach((doc) => {
				orderItemsData.push(doc.data() as Orders_History);
			});

			orderHistoryWritable.set(orderItemsData);
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getOrderHistoryByOrderUid: async (id: string) => {
		try {
			const orderItemsData: Orders_History[] = [];
			const queryCondition = query(orderHistoryCollection, where('order.id', '==', id), limit(1));
			const querySnapshot = await getDocs(queryCondition);

			querySnapshot.forEach((doc) => {
				orderItemsData.push(doc.data() as Orders_History);
			});

			return orderItemsData[0];
		} catch (e) {
			console.log('Error :', e);
		}
	}
};

export default orderHistoryWritable;
