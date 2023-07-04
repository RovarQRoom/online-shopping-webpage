import type { Items } from '$lib/DTO';
import { writable } from 'svelte/store';
  
// create a store for the cart items
const cart = writable<Items[]>([]);

export const cartHandlers = {
    // add an item to the cart
    addToCart: (item: Items) => {
        console.log("Item Added Succefully",item);
        
        cart.update((value) => {
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
    removeFromCart: (item: Items) => {
        cart.update((value) => {
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
    updateQuantity: (id: string, quantity: number) => {
        cart.update((items) => {
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
    clearCart: () => {
        cart.set([]);
    },
    getAllDataIntoCart: (items:Items[]) => {
        cart.set(items);
    },
    // subscribe to the cart store
    subscribe: cart.subscribe
    
}

export default cart;