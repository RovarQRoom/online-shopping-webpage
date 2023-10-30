import type { Favorite } from '$lib/Models';
import type { RequestCreateFavorite } from '$lib/Models/Requests/Favorite.request.model';
import { favorites_collection } from '$lib/firebase/firebase';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { writable } from 'svelte/store';

const collection = favorites_collection;

const createFavoriteStore = () => {
	const { subscribe, set, update } = writable<Favorite>();

	return {
		subscribe,
		set: (value: Favorite) => set(value),
		get: async (id: string): Promise<Favorite | undefined> => {
			const docRef = doc(collection, id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				set({ ...docSnap.data(), id: docSnap.id } as Favorite);
				return Promise.resolve(docSnap.data() as Favorite);
			} else {
				console.error(`No such document!, check the id: ${id}`);
			}
		},
		create: async (favorite: RequestCreateFavorite, userId: string) => {
			const docRef = doc(collection, userId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.error(`The document already exists! ${docSnap.id}`);
			} else {
				await setDoc(docRef, {
					...favorite,
					created_at: Timestamp.now(),
					updated_at: Timestamp.now()
				});
			}
		}
	};
};

export const favoriteStore = createFavoriteStore();