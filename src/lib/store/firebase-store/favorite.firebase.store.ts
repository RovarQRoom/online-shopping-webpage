import type { Favorite, RequestCreateFavorite } from "$lib/Models";
import { database } from "$lib/firebase/firebase";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { writable } from "svelte/store";


const FAVORITE_COLLECTION = collection(database, 'favourite');

const createFavoriteStore = () => {

    const { subscribe, set, update } = writable<Favorite>();

    return{
        subscribe,
        set: (value: Favorite) => set(value),
        get:async (id: string):Promise<Favorite | undefined> => {
            const docRef = doc(FAVORITE_COLLECTION, id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                set({...docSnap.data(),id: docSnap.id} as Favorite);
                return Promise.resolve(docSnap.data() as Favorite);
            }else{
                console.error(`No such document!, check the id: ${id}`);
            }
        },
        create: async (favourite: RequestCreateFavorite, userId:string) => {
            const docRef = doc(FAVORITE_COLLECTION,userId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                console.error(`The document already exists! ${docSnap.id}`);
            }else{
                await setDoc(docRef, {...favourite,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
                });
            }
        }
    }

}

export const favoriteStore = createFavoriteStore();