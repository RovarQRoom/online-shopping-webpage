<script lang="ts">
	import { cartStore } from '$lib/store/carts.store';
	import { Card } from 'flowbite-svelte';
	import { favouriteStore } from '$lib/store/appwrite-store/favourite.store';
	import { auth } from '$lib/firebase/firebase';
	import { onMount } from 'svelte';
	import { MinusSolid, PlusSolid } from 'flowbite-svelte-icons';
	import type { ItemsDto } from '$lib/Models/DTO/Items.dto.model';
	import { ItemsStore } from '$lib/store/appwrite-store/items.store';

	onMount(async () => {
		await ItemsStore.getAll();
		// await cartStore.getAll();
		$ItemsStore;
		console.log('Items', $ItemsStore);
	});

	let favoriteItems: {
		itemsId: string[];
		itemsNames: string[];
		userId: string | null;
	} = {
		itemsId: [],
		itemsNames: [],
		userId: null
	};

	function addItemToCart(item: ItemsDto) {
		// if the item is not in the cart, add it to the cart
		cartStore.add(item);
		isInCart(item);
	}

	function removeItemFromCart(item: ItemsDto) {
		// if the item is in the cart, remove it from the cart
		cartStore.remove(item);
	}

	// a function to check if an item is in the cart or not
	function isInCart(item: ItemsDto) {
		return $cartStore.some((i) => i.id === item.id);
	}

	async function toggleLike(id?: string, name?: string) {
		// if (favoriteItems.itemsId.includes(id!)) {
		// 	favoriteItems.itemsId = favoriteItems.itemsId.filter((item) => item !== id);
		// 	favoriteItems.itemsNames = favoriteItems.itemsNames.filter((item) => item !== name);
		// } else {
		// 	favoriteItems.itemsId = [...favoriteItems.itemsId, id!];
		// 	favoriteItems.itemsNames = [...favoriteItems.itemsNames, name!];
		// }
		// // if the user is not authenticated, save the favorite items in the local storage, when the user logs in, we will save them in the database.
		// if (auth.currentUser != null) {
		// 	// await $favouriteStore.create(favoriteItems, auth.currentUser?.uid!);
		// } else {
		// 	localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
		// }
	}

	onMount(async () => {
		if (auth.currentUser != null) {
			await favouriteStore.get(auth.currentUser?.uid!);
			favoriteItems = {
				itemsId: $favouriteStore.itemsId,
				itemsNames: $favouriteStore.itemsName,
				userId: auth.currentUser?.uid!
			};
		} else {
			let items_Id: string[] = [];
			let items_names: string[] = [];
			if (localStorage.getItem('favoriteItems') != null) {
				items_Id = JSON.parse(localStorage.getItem('favoriteItems')!).itemsId;
				items_names = JSON.parse(localStorage.getItem('favoriteItems')!).itemsNames;
			}

			favoriteItems = {
				itemsId: items_Id,
				itemsNames: items_names,
				userId: null
			};
		}
	});
</script>

{#each $ItemsStore.data as items}
	<Card
		class="m-2 w-44 h-auto md:w-64 flex flex-col justify-between border-black dark:border-white items-center rounded-2xl"
		color="dark"
		data-aos="zoom-in"
	>
		<div class="flex justify-start items-start w-full">
			<button on:click={() => toggleLike(items.id, items.name)}>
				<!-- {#if favoriteItems.itemsId.includes(items.id)}
					<i class="fa-solid fa-heart fa-lg cursor-pointer text-red-600" id="heart" />
				{:else}
					<i class="fa-regular fa-heart fa-lg cursor-pointer" id="heart" />
				{/if} -->
			</button>
		</div>
		<a href="/">
			<img
				class="p-4 rounded-t-lg object-contain w-36 h-36"
				src={items.itemImage}
				alt="product 1"
			/>
		</a>
		<div class="px-5 pb-5 flex justify-start w-full flex-col">
			<a href="/">
				<h5 class="text-lg text-center font-semibold tracking-tight text-gray-900 dark:text-white">
					{items.name}
				</h5>
			</a>
			<span class="text-md text-center font-medium">{items.price} IQD</span>
		</div>
		<div
			class="flex justify-center bg-[#f17f18] rounded-full items-center transition-all duration-500"
			style="width: {$cartStore.some((i) => i.id === items.id) ? '75%' : '36px'}"
		>
			{#if $cartStore.some((i) => i.id === items.id)}
				<div class="flex justify-between w-full text-white">
					<button
						on:click={() => {
							addItemToCart(items);
						}}
						class="justify-start p-2 text-white"
						><PlusSolid
							class="dark:hover:text-black hover:text-black text-white transition-all"
						/></button
					>
					<span
						class="flex justify-center items-center text-xl text-center font-bold dark:text-gray-100"
						>{$cartStore.find((i) => i.id === items.id)?.quantity ?? ''}</span
					>
					<button
						on:click={() => {
							removeItemFromCart(items);
						}}
						class="justify-end p-2"
						><MinusSolid
							class="dark:hover:text-black hover:text-black text-white transition-all"
						/></button
					>
				</div>
			{:else}
				<button
					on:click={() => {
						addItemToCart(items);
					}}
					class="text-3xl font-boldflex justify-center p-2"
					><PlusSolid
						class="dark:hover:text-black hover:text-black text-white transition-all"
					/></button
				>
			{/if}
		</div>
	</Card>
{/each}
