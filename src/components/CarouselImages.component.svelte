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
		<div class="w-full mt-36 md:mt-44">
			<Carousel let:Controls>
				{#each images as image}
					<Img
						href={image.attribution}
						src={image.imgurl}
						alt=""
						class="object-cover w-full h-[35rem] rounded-3xl px-2"
					/>
				{/each}
			</Carousel>
		</div>
	{/if}
{/if}
