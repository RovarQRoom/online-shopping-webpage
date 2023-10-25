<script lang="ts">
	import '../app.postcss';
	import categoryWritable from '$lib/store/firebase-store/category.firebase.store';
	import itemsWritable from '$lib/store/firebase-store/items.firebase.store';
	import Footer from '../components/Footer.component.svelte';
	import Navbar from '../components/Navbar.component.svelte';
</script>

<main class="bg-slate-100 dark:bg-gray-950 w-full h-full">
	<Navbar />
	<div>
		<slot />
	</div>
</main>
<Footer />
