import type { CreateUser } from '$lib/Models/Requests/User.request.model';
import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

// Create a writable store with an initial value of null
export const userWritable = writable<CreateUser>({
	user: null,
	confirmationResult: null,
	loading: true,
	data: null,
	errorMessage: null
});
export const createAuthStore = () => {
	const { subscribe, set, update } = writable<CreateUser>();

	return {
		subscribe,
		set: (value: CreateUser) => set(value),
		sign_in: (user: User) => {
		},
		sign_out: () => {
		},
		sign_up: (user: User) => {
		},
		confirm: (code: string) => {
		}
	}
};

export const authStore = createAuthStore();
