import { doc, getDoc, getDocs, query } from 'firebase/firestore';
import type { Roles } from '../../Models';
import { roles_collection } from '../../firebase/firebase';
import { writable } from 'svelte/store';

const collection = roles_collection;

export const createRolesWritable = () => {
	const { subscribe, set, update } = writable<Roles[]>([]);

	return {
		subscribe,
		set: (value: Roles[]) => set(value),
		get: async (id: string) => {
			try {
				const docRef = doc(collection, id);
				const docSnap = await getDoc(docRef);

				return { id: docSnap.id, ...docSnap.data() };
			} catch (e) {
				console.log('Error :', e);
			}
		},
		getAll: async () => {
			try {
				const rolesData: Roles[] = [];
				const queryCondition = query(collection);
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

				set(rolesData);
			} catch (e) {
				console.log('Error :', e);
			}
		}
	};
};

export const rolesWritable = createRolesWritable();
