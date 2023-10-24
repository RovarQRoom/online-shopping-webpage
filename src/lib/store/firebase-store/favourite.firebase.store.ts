import type { Favourite, RequestCreateFavorite } from "$lib/DTO/Favourite.DTO";
import { database } from "$lib/firebase/firebase";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { writable } from "svelte/store";


const FAVOURITE_COLLECTION = collection(database, 'favourite');

const createFavouriteStore = () => {

    const { subscribe, set, update } = writable<Favourite>();

    return{
        subscribe,
        set: (value: Favourite) => set(value),
        get:async (id: string):Promise<Favourite | undefined> => {
            const docRef = doc(FAVOURITE_COLLECTION, id);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                set({...docSnap.data(),id: docSnap.id} as Favourite);
                return Promise.resolve(docSnap.data() as Favourite);
            }else{
                console.error(`No such document!, check the id: ${id}`);
            }
        },
        create: async (favourite: RequestCreateFavorite, userId:string) => {
            const docRef = doc(FAVOURITE_COLLECTION,userId);
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

export const favouriteStore = createFavouriteStore();