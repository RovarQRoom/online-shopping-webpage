<script lang="ts">
	import '../app.postcss';
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
