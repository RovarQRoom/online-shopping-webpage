<script lang="ts">
	import '../app.postcss';
	import '../input.css';
	import Footer from '../components/Footer.component.svelte';
	import Navbar from '../components/Navbar.component.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { ItemsStore } from '$lib/store/appwrite-store/items.store';

	$: pathUrl = $page.url.pathname;

	onMount(async () => {
		await ItemsStore.getAll();
		console.log('Items Data ', $ItemsStore);
	});
</script>

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
