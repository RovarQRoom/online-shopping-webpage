<script lang="ts">
	import '../app.postcss';
	import '../input.css';
	import Footer from '../components/Footer.component.svelte';
	import Navbar from '../components/Navbar.component.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/store/firebase-store';

	$: pathUrl = $page.url.pathname;

	onMount(async () => {
		await authStore.get();

		console.log($authStore.data);
		
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
