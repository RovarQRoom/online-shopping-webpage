import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc
} from 'firebase/firestore';
import { writable } from 'svelte/store';
import userWritable from './auth.firebase.store';
import type { Users } from '../../DTO';
import { database } from '../../firebase/firebase';

// Create a writable store with an initial value of null
const usersWritable = writable<Users[]>([]);
export const usersCollection = collection(database, 'users');

export const usersHandlers = {
	getUser: async (id: string) => {
		try {
			const docRef = doc(usersCollection, id);
			const docSnap = await getDoc(docRef);

			return docSnap.data();
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getUsers: async () => {
		try {
			const usersData: Users[] = [];
			const queryCondition = query(usersCollection);
			const querySnapshot = await getDocs(queryCondition);

			querySnapshot.forEach((doc) => {
				usersData.push(
					Object.assign(
						{
							id: doc.id
						},
						doc.data()
					) as Users
				);
			});

			usersWritable.set(usersData);
		} catch (e) {
			console.log('Error :', e);
		}
	},
	updateUser: async (id: string, user: Users) => {
		try {
			const docRef = doc(usersCollection, id);
			await updateDoc(docRef, { ...user });

			await usersHandlers.getUsers();
		} catch (e) {
			console.log('Error :', e);
		}
	}
};

export default usersWritable;
