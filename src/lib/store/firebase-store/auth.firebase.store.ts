import type { CreateUser } from '$lib/Models/Requests/User.request.model';
import { auth, database } from '$lib/firebase/firebase';
import { signInWithPhoneNumber, type ApplicationVerifier, type ConfirmationResult} from 'firebase/auth';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { writable } from 'svelte/store';

// Create a writable store with an initial value of null
export const userWritable = writable<CreateUser>();
export const createAuthStore = () => {
	const { subscribe, set, update } = writable<CreateUser>();

	return {
		subscribe,
		set: (value: CreateUser) => set(value),
		sign_in: async (phoneNumber: string, applicationVerifier:ApplicationVerifier) => {
			try{
				let confirmationResult = await signInWithPhoneNumber(auth ,phoneNumber, applicationVerifier);
				if (confirmationResult) {
					set({
						user: auth.currentUser,
						confirmationResult: confirmationResult,
						loading: false,
						data: null,
						errorMessage: null
					});
				}
			}catch(e){
				console.log("Error: ",e);
			}
		},
		sign_out: async() => {
			try{
				await auth.signOut();
				set({
					user: null,
					confirmationResult: undefined,
					loading: false,
					data: null,
					errorMessage: null
				});
			}catch(e){
				console.log("Error: ",e);
			}
		},
		confirm: async (code: string, confirmationResult:ConfirmationResult) => {
			try{
				await confirmationResult.confirm(code);
			}catch(e){
				console.log("Error: ",e);
			}
		},
		get_user_by_phone_number: async (phoneNumber: string) => {
			try{
				const queryUsers = query(
				collection(database, 'users'), 
				where('phone', '==', phoneNumber),
				limit(1)
				);

			const querySnapshot = await getDocs(queryUsers);

			const user = querySnapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			})[0];

			return user;
		}catch(e){
			console.log("Error: ",e);
		}
	}
	}
};

export const authStore = createAuthStore();
