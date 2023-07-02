import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { Order_Items } from '../../DTO';
import { database } from '../../firebase/firebase';

// Create a writable store with an initial value of null
const orderItemsWritable = writable<Order_Items[]>([]);
const orderItemsCollection = collection(database, 'order_items');

export const orderItemsHandlers = {
	getOrderItems: async (id: string) => {
		try {
			const docRef = doc(orderItemsCollection, id);
			const docSnap = await getDoc(docRef);

			return docSnap.data();
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getOrdersItems: async (id: string) => {
		try {
			const orderItemsData: Order_Items[] = [];
			const queryCondition = query(orderItemsCollection, where('order_uid', '==', id));
			const querySnapshot = await getDocs(queryCondition);

			querySnapshot.forEach((doc) => {
				orderItemsData.push(doc.data() as Order_Items);
			});

			orderItemsWritable.set(orderItemsData);
			console.log('orderItemsData In STore :', orderItemsData);
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getAllItemsFromOrder: async () => {
		try {
			const orderItemsData: Order_Items[] = [];
			const queryCondition = query(orderItemsCollection);
			const querySnapshot = await getDocs(queryCondition);

			querySnapshot.forEach((doc) => {
				orderItemsData.push(doc.data() as Order_Items);
			});

			console.log('orderItemsData In STore :', orderItemsData);

			return orderItemsData;
		} catch (e) {
			console.log('Error :', e);
		}
	},
	clearTheOrderItems: () => {
		orderItemsWritable.set([]);
	}
};

export default orderItemsWritable;
