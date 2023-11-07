import type { CreateUser } from '$lib/Models/Requests/User.request.model';
import { account } from '$lib/appwrite/appwrite';
import { ID } from 'appwrite';
import { writable } from 'svelte/store';

// Create a writable store with an initial value of null
export const userWritable = writable<CreateUser>();
const createAuthStore = () => {
	const { subscribe, set, update } = writable<CreateUser>();

	return {
		subscribe,
		set: (value: CreateUser) => set(value),
		get: async () => {
			const user_account = await account.get();
			const mapToUser = {
				id: user_account.$id,
				name: user_account.name,
				email: user_account.email,
				phone: user_account.phone,
				gender: user_account.prefs.gender,
				imgUrl: user_account.prefs.img_url,
				birthday: user_account.prefs.birthday,
				roles: user_account.labels
			};
			set({
				data: mapToUser,
				loading: false,
				errorMessage: null
			});

			return mapToUser;
		},
		sign_in: async (userId: string, secret: string) => {
			try {
				await account.updatePhoneSession(userId, secret);
			} catch (e) {
				console.log('Error: ', e);
			}
		},
		sign_up: async (phoneNumber: string) => {
			try {
				const sessionToken = await account.createPhoneSession(ID.unique(), phoneNumber);
				const userId = sessionToken.userId;
				return userId;
			} catch (e) {
				console.log('Error: ', e);
			}
		},
		sign_out: async () => {
			try {
			} catch (e) {
				console.log('Error: ', e);
			}
		},
		confirm: async (code: string) => {
			try {
			} catch (e) {
				console.log('Error: ', e);
			}
		},
		get_user_by_id: async (userId: string) => {
			try {
			} catch (e) {
				console.log('Error: ', e);
			}
		}
	};
};

export const authStore = createAuthStore();
