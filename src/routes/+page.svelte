<script lang="ts">
	import CardsImagesCarousel from '../components/CarouselImages.component.svelte';
	import Footer from '../components/Footer.component.svelte';
	import SectionTitle from '../components/SectionTitle.component.svelte';
	import Categories from '../components/Categories.component.svelte';
	import Items from '../components/Items.component.svelte';
	


	
</script>

<CardsImagesCarousel />
<SectionTitle name="Categories" />
<div class="flex justify-center flex-wrap mt-5">
	<Categories />
</div>
	<SectionTitle name="Popular Items" />
<div class="w-full container mx-auto flex justify-center items-center gap-px flex-wrap mt-5">
	<Items />
</div>
