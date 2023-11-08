<script lang="ts">
	import CardsImagesCarousel from '../components/CarouselImages.component.svelte';
	import SectionTitle from '../components/SectionTitle.component.svelte';
	import Categories from '../components/Categories.component.svelte';
	import Items from '../components/Items.component.svelte';
	import { onMount } from 'svelte';


	
</script>

<CardsImagesCarousel />
	<SectionTitle name="Popular Items" />
	
	<div class="w-full relative h-auto container mx-auto flex justify-center items-center gap-px flex-wrap mt-5">
		
			<Items />
		</div>
