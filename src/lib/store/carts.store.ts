import type { ItemsDto } from '$lib/Models/DTO/Items.dto.model';
import { writable } from 'svelte/store';

export const createCartStore = () => {
	const { subscribe, set, update } = writable<ItemsDto[]>([]);

	return {
		subscribe,
		set: (value: ItemsDto[]) => set(value),
		// add an item to the cart
		add: (item: ItemsDto) => {
			update((value) => {
				// check if the item already exists in the cart
				const existingItem = value.find((i) => i.id === item.id);
				if (existingItem) {
					// increment the quantity of the existing item
					existingItem.quantity++;
				} else {
					// add a new item with quantity 1
					value.push({ ...item, quantity: 1 });
				}
				return value;
			});
		},
		// remove an item from the cart
		remove: (item: ItemsDto) => {
			update((value) => {
				// find the index of the item in the cart
				const index = value.findIndex((i) => i.id === item.id);
				if (index !== -1) {
					// decrement the quantity of the item
					value[index].quantity--;
					// if the quantity is zero, remove the item from the cart
					if (value[index].quantity === 0) {
						value.splice(index, 1);
					}
				}
				return value;
			});
		},
		// update the quantity of an item in the cart
		update: (id: string, quantity: number) => {
			update((items) => {
				const itemIndex = items.findIndex((i) => i.id === id);
				if (itemIndex === -1) {
					return items;
				}
				const newItems = [...items];
				newItems[itemIndex].quantity = quantity;
				return newItems;
			});
		},
		// clear the cart
		clear: () => {
			set([]);
		},
		get: (items: ItemsDto[]) => {
			set(items);
		}
	};
};

export const cartStore = createCartStore();