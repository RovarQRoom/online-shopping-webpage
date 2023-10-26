import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { writable } from 'svelte/store';
import type { Roles } from '../../Models';
import { database } from '../../firebase/firebase';

// Create a writable store with an initial value of null
const rolesWritable = writable<Roles[]>([]);
export const rolesCollection = collection(database, 'roles');

export const rolesHandlers = {
	getRole: async (id: string) => {
		try {
			const docRef = doc(rolesCollection, id);
			const docSnap = await getDoc(docRef);

			return { id: docSnap.id, ...docSnap.data() };
		} catch (e) {
			console.log('Error :', e);
		}
	},
	getRoles: async () => {
		try {
			const rolesData: Roles[] = [];
			const queryCondition = query(rolesCollection);
			const querySnapshot = await getDocs(queryCondition);

			querySnapshot.forEach((doc) => {
				rolesData.push(
					Object.assign(
						{
							id: doc.id
						},
						doc.data()
					) as Roles
				);
			});

			console.log('usersData In Store :', rolesData);

			rolesWritable.set(rolesData);
		} catch (e) {
			console.log('Error :', e);
		}
	}
};

export default rolesWritable;
