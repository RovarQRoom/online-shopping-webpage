import type { RegisterOption } from '$lib/Models/Options/Register.option.model';
import type { CreateUser } from '$lib/Models/Requests/User.request.model';
import { account } from '$lib/appwrite/appwrite';
import { error } from '@sveltejs/kit';
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
			console.log('user_account: ', user_account);
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
		},
		sign_in: async (userId: string, secret: string) => {
			try {
				await account.updatePhoneSession(userId, secret);

				return await account.get();


				

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
				await account.deleteSession('current');
			} catch (e) {
				console.log('Error: ', e);
			}
		},
		update_user: async (registerOptions: RegisterOption) => {
			try {
				if(registerOptions.name){

					await account.updateName(registerOptions.name);
				}else{
					return error(400,'Name is required');
				}
				if(registerOptions.gender != null){
					await account.updatePrefs({gender:registerOptions.gender})
				}else{
					return error(400,"Gender is required");
				}
				if(registerOptions.birthday){
					await account.updatePrefs({birthday:registerOptions.birthday})
				}
				// if(registerOptions.image){
				// 	await account.updatePrefs({imgUrl:registerOptions.image})
				// }

				await account.updatePrefs(registerOptions);
			} catch (e) {
				console.log('Error: ', e);
			}
		}
	};
};

export const authStore = createAuthStore();
