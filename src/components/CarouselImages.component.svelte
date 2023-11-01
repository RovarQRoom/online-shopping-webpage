<script lang="ts">
	import { onMount } from 'svelte';
	import { cardsHandlers, categoryStore } from '$lib/store/firebase-store';
	//@ts-ignore
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { Img } from 'flowbite-svelte';
	import type { Cardd } from '$lib/Models';
	import { Card } from 'flowbite-svelte';
	let cardData: Cardd[];
	let images: { id: number; name: string; imgurl: string; attribution: string }[];
	onMount(async () => {
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

	<div class="w-full h-auto flex items-center flex-col md:flex-row  mt-36 md:mt-44">

		<div class="w-full md:w-[73.5%]  rounded-t-3xl pl-4">
			
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


<div class="bg-[#ffffffb3] dark:bg-[#21212159] rounded-lg md:rounded-3xl w-full  md:w-[95%] md:w-full h-38 md:h-[580px] block overflow-hidden flex-nowrap md:flex-wrap justify-center items-start  md:overflow-hidden  md:mr-5 border border-solid border-3 border-black px-2 md:px-0">
	<a href="/category" class="w-full">

		<div class="see_more_cont w-full gap-3   hover:h-[580px] rounded-t-3xl hover:rounded-3xl items-center justify-center  flex-col h-auto hover:bg-white hover:dark:bg-gray-800 bg-[#f17f18]  text-white hidden md:flex   hover:ease-in-out duration-300">
			
			<img src="./Images/seemore.png" alt="" width="70" height="70" class="see_more flex justify-center items-center text-center hover:ease-in-out duration-300">
			<button class="seemore_txt w-full h-[80px] rounded-b-3xl   justify-center text-white hidden md:flex items-center">See More</button>
		</div>
	</a>
	<div class="w-full overflow-hidden  h-4/5 flex justify-center items-center md:flex-wrap gap-2 md:gap-2 md:px-2">

		{#each $categoryStore.data as category}
		<Card
		class=" my-2 rounded-2xl w-auto h-auto  lg:w-38 lg:h-38 flex justify-center items-center flex-cols shadow-none  hover:border-[#f17f18] dark:hover:border-[#f17f18] transition duration-300 ease-in-out"
		>
		<a href="/">
			<img
			class="rounded-t-lg object-cover bg-contain  w-10 h-8 md:w-24 md:h-32"
			src={category.category_image}
			alt="product 1"
			/>
		</a>
		<div class=" flex justify-center">
			<a href="/">
				<h5 class="text-xs md:text-xl font-semibold text-gray-900 dark:text-white ">
					{category.name}
				</h5>
			</a>
		</div>
	</Card>
	{/each}
</div>
	
</div>

</div>
{/if}
{/if}


<style>
	.see_more{
		display: none;
	}
	.see_more_cont:hover .see_more{
		display: block;
		transition: all .3s ease-in-out;
	}

	.see_more_cont:hover{
		transition: all .3s ease-in-out;
	}

	.see_more_cont:hover .seemore_txt{
		color: #f17f18;
		font-weight: bold;
	}

	.seemore_txt{
		font-weight: bold;
	}
</style>