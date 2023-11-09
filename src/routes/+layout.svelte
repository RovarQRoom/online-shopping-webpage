<script lang="ts">
	import '../app.postcss';
	import '../input.css';
	import Footer from '../components/Footer.component.svelte';
	import Navbar from '../components/Navbar.component.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { authStore} from '$lib/store/firebase-store';
	import { Card } from 'flowbite-svelte';
	import { cardsStore } from '$lib/store/appwrite-store/card.store';
	import { categoryStore } from '$lib/store/appwrite-store/category.store';
	import { favouriteStore } from '$lib/store/appwrite-store/favourite.store';
	import { ItemsStore } from '$lib/store/appwrite-store/items.store';

	$: pathUrl = $page.url.pathname;

	onMount(async () => {
		await authStore.get();
		await ItemsStore.getAll();
		console.log($authStore.data);
		console.log("Items Data ",$ItemsStore);
		
	});
</script>

{#if pathUrl != "/login"}
<main class="bg-slate-100 dark:bg-gray-950 w-full h-full">
	<Navbar />
	<div>
		<slot />
	</div>
</main>
<Footer />
{:else}
<main class="bg-slate-100 dark:bg-gray-950 w-full h-full">
	<div>
		<slot />
	</div>
</main>
{/if}
