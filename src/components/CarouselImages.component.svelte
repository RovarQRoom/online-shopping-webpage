<script lang="ts">
	import { onMount } from 'svelte';
	import { cardsHandlers } from '$lib/store/firebase-store';
	//@ts-ignore
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { Img } from 'flowbite-svelte';
	import type { Card } from '$lib/Models';

	let cardData: Card[];
	let images: { id: number; name: string; imgurl: string; attribution: string }[];
	onMount(async () => {
		console.log('Carousel mounted');

		cardData = (await cardsHandlers.getCards())?.cardsData ?? [];

		images = cardData.map((card, index) => {
			return {
				id: index,
				name: '',
				imgurl: card.image_url,
				attribution: card.webpage_url
			};
		});
	});
	
</script>

{#if images}
	{#if browser}
	<div class="w-full md:w-[65%] mt-36 md:mt-44 rounded-t-3xl pl-4">

		<Carousel
	  autoplay
	  autoplayDuration={5000}
	  autoplayProgressVisible
	class="w-full rounded-t-3xl"
	>
	
	  {#each images as image}
		<img src={image.imgurl} alt=""
		class="object-cover w-full h-[35rem] rounded-t-3xl"
		
		>
	  {/each}
	</Carousel>
	</div>
	{/if}
{/if}

