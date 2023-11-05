<script lang="ts">
	import '../app.postcss';
	import '../input.css';
	import Footer from '../components/Footer.component.svelte';
	import Navbar from '../components/Navbar.component.svelte';
	import { page } from '$app/stores';

	$: pathUrl = $page.url.pathname;
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
