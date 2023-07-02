import {
	signInWithPhoneNumber,
	type User,
	type ConfirmationResult,
	RecaptchaVerifier,
	type UserCredential,
	signOut
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { writable } from 'svelte/store';
import { auth, database } from '../../firebase/firebase';
import type { Users } from '../../DTO';

// Create a writable store with an initial value of null
export const userWritable = writable<{
	user: User | null;
	confirmationResult?: null | ConfirmationResult;
	loading: boolean;
	data: any;
	errorMessage: string | null;
}>({
	user: null,
	confirmationResult: null,
	loading: true,
	data: {},
	errorMessage: null
});
let recaptcha: undefined | RecaptchaVerifier = undefined;
export const authHandlers = {
	login: async (phonenumber: string) => {
		console.log('phoneNumber', phonenumber);
		try {
			const user = await authHandlers.fetchUserByPhoneNumber(phonenumber);

			if (user) {
				try {
					if (!recaptcha) {
						recaptcha = new RecaptchaVerifier(
							'sign-in-button',
							{
								size: 'invisible'
							},
							auth
						);
					} else {
						recaptcha.render();
					}
				} catch (e) {
					console.log(e);
				}

				try {
					const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(
						auth,
						phonenumber,
						recaptcha!
					);

					//clear the recaptcha to avoid error
					userWritable.update((store) => {
						store.confirmationResult = confirmationResult ? confirmationResult : null;
						return store;
					});

					return confirmationResult;
				} catch (e) {
					console.log(e);
				}
			} else {
				userWritable.update((store) => {
					store.errorMessage = 'User does not have access to this webpage';
					return store;
				});
			}
		} catch (e) {
			console.log('Login error:', e);
			throw new Error('Login failed'); // Throw a custom error object or handle the error appropriately
		}
	},
	loginOTP: async (code: string, confirmationResult: ConfirmationResult) => {
		try {
			console.log('code', code);
			const userCredential: UserCredential = await confirmationResult.confirm(code);
			console.log('userCredential', userCredential);
		} catch (e) {
			console.log('OTP verification error:', e);
			throw new Error('OTP verification failed'); // Throw a custom error object or handle the error appropriately
		}
	},
	logout: async () => {
		try {
			await signOut(auth);
			userWritable.update((store) => {
				store.user = null;
				return store;
			});
		} catch (e) {
			console.log('Logout error:', e);
			throw new Error('Logout failed'); // Throw a custom error object or handle the error appropriately
		}
	},
	fetchUserByPhoneNumber: async (phoneNumber: string) => {
		try {
			// Get the user document in the users collection by PhoneNumber
			const queryUsers = query(
				collection(database, 'users'),
				where('phone', '==', phoneNumber),
				limit(1)
			);
			const querySnapshot = await getDocs(queryUsers);

			const userData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})) as Users[];

			console.log('UserData in FetchUser', userData);
			if (userData && userData[0].role) {
				if (
					userData[0].role.name === 'admin' ||
					userData[0].role.name === 'superAdmin' ||
					userData[0].role.name === 'monitor' ||
					userData[0].role.name === 'employee'
				) {
					return true;
				} else {
					return false;
				}
			}
		} catch (e) {
			console.log('Error :', e);
		}
	},
	fetchAuthenticatedUser: async () => {
		try {
			// Get the User Document By Firebase Auth UID
			const id = auth.currentUser?.uid;
			if (id) {
				const user = await doc(database, 'users', id);
				const userSnapshot = await getDoc(user);

				userWritable.update((store) => {
					store.user = userSnapshot.data() as User;
					store.loading = false;
					return store;
				});

				return userSnapshot.data() as User;
			}

			return null;
		} catch (e) {
			console.log('Error :', e);
		}
	}
};

export default userWritable;
