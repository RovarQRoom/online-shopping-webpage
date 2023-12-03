<script lang="ts">
	import '../app.postcss';
	import '../input.css';
	import Footer from '../components/Footer.component.svelte';
	import Navbar from '../components/Navbar.component.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { ItemsStore } from '$lib/store/appwrite-store/items.store';
	import { authStore } from '$lib/store/firebase-store';
	import { categoryStore } from '$lib/store/appwrite-store/category.store';
	import { Img, Spinner } from 'flowbite-svelte';

	$: pathUrl = $page.url.pathname;
	let loading = true;
	onMount(async () => {
		try {
			await authStore.get();
			await categoryStore.getAll();
			await ItemsStore.getAll();
			console.log('Items Data ', $categoryStore);
		} finally {
			loading = false;
		}
	});
	
</script>
{#if loading}
<div class="flex justify-center items-center w-full h-screen">

	<Img src="Images/kubak_loading.gif" class="object-fit"/>
</div>
{:else} 
{#if pathUrl != '/login' && pathUrl != '/registration'}
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
{/if}
