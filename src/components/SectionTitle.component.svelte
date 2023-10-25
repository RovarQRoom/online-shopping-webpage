<script lang="ts">
	import { Badge } from 'flowbite-svelte';

	export let name: string = 'Section Name';
</script>

<div class="flex justify-center w-full mt-24">
	<Badge border class="text-2xl font-bold text-gray-100 rounded-3xl border-black"
		><span class="dark:text-gray-50 text-gray-800 p-1 px-4"> {name} </span></Badge
	>
</div>
