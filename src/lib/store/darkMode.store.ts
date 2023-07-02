import { writable } from 'svelte/store';

export const darkMode = writable<boolean>(false);

export const toggleDarkMode = () => {
	darkMode.update((value) => !value);
};
