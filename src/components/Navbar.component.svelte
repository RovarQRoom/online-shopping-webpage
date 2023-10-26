<script lang="ts">
	import itemsWritable from '$lib/store/firebase-store/items.firebase.store';
	import { goto } from '$app/navigation';
	import { functions } from '$lib/firebase/firebase';
	import { cartStore } from '$lib/store/carts.store';
	import { itemsHandlers, userWritable } from '$lib/store/firebase-store';
	import categoryWritable, {
		categoryHandlers
	} from '$lib/store/firebase-store/category.firebase.store';
	import { httpsCallable } from 'firebase/functions';
	import {
		Drawer,
		CloseButton,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Avatar,
		Button,
		Navbar,
		NavBrand,
		NavUl,
		NavLi,
		NavHamburger,
		Search,
		DarkMode,
		Chevron,
		Dropdown,
		Checkbox,
		DropdownItem
	} from 'flowbite-svelte';
	import { UserCircleSolid, CartOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import type { Items } from '$lib/Models';

	let hiddenDrawer: boolean = true;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	let overhaulPrice: number = 0;
	let screenWidth: number;

	onMount(async () => {
		updateScreenWidth();
		window.addEventListener('resize', updateScreenWidth);

		await categoryHandlers.getCategories();
		await itemsHandlers.getItems(undefined, 'popularity', false);

		// get all data into the cart
		let saveData: any = localStorage.getItem('cart');
		if (saveData) {
			saveData = (JSON.parse(saveData ?? '') as Items[]) ?? [];
			cartStore.get(saveData);
		}

		cartStore.subscribe((value) => {
			localStorage.setItem('cart', JSON.stringify(value));
		});
	});

	$: {
		overhaulPrice = 0;
		if ($cartStore) {
			$cartStore.forEach((item) => {
				overhaulPrice += item.price * item.quantity;
			});
		}
	}

	const updateScreenWidth = () => {
		screenWidth = window.innerWidth;
	};

	async function buyingItems() {
		if ($userWritable.user) {
			await httpsCallable(
				functions,
				'buyItems'
			)({
				items: $cartStore,
				client_uid: $userWritable.user.uid,
				total_amount: overhaulPrice,
				address: $userWritable.user.displayName
			});
		} else {
			goto('/login');
		}
	}
</script>

{#if $categoryWritable.categories && $itemsWritable.items}
	<Drawer
		placement="right"
		transitionType="fly"
		{transitionParams}
		bind:hidden={hiddenDrawer}
		width="w-[20%]"
		id="sidebar1"
	>
		<div class="flex items-center">
			<h5
				id="drawer-label"
				class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
			>
				<svg
					class="w-5 h-5 mr-2"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>Cart
			</h5>
			<CloseButton on:click={() => (hiddenDrawer = true)} class="mb-4 dark:text-white" />
		</div>
		{#if $cartStore}
			<Table noborder={true}>
				<TableHead
					class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
				>
					<TableHeadCell>Image</TableHeadCell>
					<TableHeadCell>Product Name</TableHeadCell>
					<TableHeadCell>Quantity</TableHeadCell>
					<TableHeadCell>Price</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each $cartStore as item}
						<TableBodyRow>
							<TableBodyCell
								><Avatar class="object-contain p-1" src={item.item_image} rounded /></TableBodyCell
							>
							<TableBodyCell>{item.name}</TableBodyCell>
							<TableBodyCell>{item.quantity}</TableBodyCell>
							<TableBodyCell>{item.price}</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
				<tfoot>
					<tr class="font-semibold text-gray-900 dark:text-white">
						<th scope="row" class="py-3 px-6 text-base">Total</th>
						<td class="py-3 px-6">{overhaulPrice}</td>
					</tr>
				</tfoot>
			</Table>
		{/if}

		<div class="grid gap-4">
			<Button on:click={buyingItems}>Buy Now</Button>
		</div>
	</Drawer>
	<Navbar
		let:hidden
		let:toggle
		class="fixed z-30 top-0 backdrop-blur-lg bg-[#ffffffb3] dark:bg-[#212121b3]"
	>
		<NavBrand href="/" class="w-full flex justify-center items-center">
			<img src="/Images/kubak.logo.svg" class="mr-3 h-6 sm:h-9" alt="Kubak" />
			<span
				class="self-center whitespace-nowrap text-md md:text-lg font-semibold dark:text-white uppercase"
			>
				Kubak Online Shopping
			</span>
		</NavBrand>
		<div class="flex items-center justify-between w-full flex-wrap md:flex-nowrap mt-5">
			{#if screenWidth > 768}
				<NavUl class="md:order-1">
					<div class="w-auto items-center justify-center">
						<i class="fa-regular fa-heart fa-2xl cursor-pointer" id="heart" />
					</div>

					<NavLi href="/" class="flex flex-row items-center">
						<UserCircleSolid class="mx-1" size="30" />
					</NavLi>
					<button on:click={() => (hiddenDrawer = false)}>
						<NavLi class="flex flex-row items-center">
							<CartOutline class="mx-1" size="30" />
						</NavLi>
					</button>
				</NavUl>
			{/if}
			<div class="w-full flex justify-between">
				<NavHamburger on:click={toggle} />
				<div class="flex justify-center items-center w-full md:flex-row-reverse gap-2">
					<Search class="h-full w-full" />

					<DarkMode class="text-lg m-1">
						<svelte:fragment slot="lightIcon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 32 32"
								><path
									fill="currentColor"
									d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
								/></svg
							>
						</svelte:fragment>
						<svelte:fragment slot="darkIcon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 32 32"
								><path
									fill="currentColor"
									d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
								/></svg
							>
						</svelte:fragment>
					</DarkMode>
				</div>
			</div>
			<NavUl {hidden} class="w-full">
				<NavLi href="/" active={true}>Home</NavLi>
				<NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Categories</Chevron></NavLi>
				<Dropdown
					triggeredBy="#nav-menu1"
					class="z-20 w-52 overflow-y-auto overflow-x-hidden h-auto scrollbar-thumb-orange-600 scrollbar-track-gray-100 scrollbar-thin scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl"
				>
					{#each $categoryWritable.categories as category}
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Checkbox>{category.name}</Checkbox>
						</li>
					{/each}
					<DropdownItem
						slot="footer"
						class="h-auto rounded-lg mx-2 text-center text-white cursor-pointer hover:bg-white dark:hover:bg-white hover:border-[#f17f18] bg-[#f17f18] hover:text-[#f17f18] dark:hover:text-[#f17f18] transition-all"
						href="/search">Search</DropdownItem
					>
				</Dropdown>
				<NavLi href="/services">Services</NavLi>
				{#if screenWidth <= 1280}
					<NavLi href="/" class="flex flex-row items-center">
						<UserCircleSolid class="mx-1" size="25" />
						Account
					</NavLi>

					<button on:click={() => (hiddenDrawer = false)}>
						<NavLi class="flex flex-row items-center">
							<CartOutline class="mx-1" size="25" />
							Cart</NavLi
						>
					</button>
				{/if}
			</NavUl>
		</div></Navbar
	>
{:else}
	<main class="bg-slate-100 dark:bg-gray-950">
		<h1>Loading</h1>
	</main>
{/if}
