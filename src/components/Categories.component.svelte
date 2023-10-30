<script>
	import categoryWritable from '$lib/store/firebase-store/category.firebase.store';
	import { Card } from 'flowbite-svelte';
</script>

{#each $categoryWritable.categories as category}
	<Card
		class="m-2 rounded-2xl w-44 h-44 flex justify-center items-center flex-cols shadow-none border border-black dark:border-white hover:border-[#f17f18] dark:hover:border-[#f17f18] transition duration-300 ease-in-out"
	>
		<a href="/">
			<img
				class="rounded-t-lg object-cover p-3 w-40 h-32"
				src={category.category_image}
				alt="product 1"
			/>
		</a>
		<div class=" flex justify-center">
			<a href="/">
				<h5 class="text-xl font-semibold text-gray-900 dark:text-white">
					{category.name}
				</h5>
			</a>
		</div>
	</Card>
{/each}
