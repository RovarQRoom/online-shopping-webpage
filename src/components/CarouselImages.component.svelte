<script lang="ts">
	import { onMount } from 'svelte';
	import { cardsStore } from '$lib/store/appwrite-store/card.store';
	//@ts-ignore
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import type { CardDto } from '$lib/Models/DTO/Card.dto.model';
	let images: { id: string; name: string; imgurl: string; attribution: string }[];
	onMount(async () => {
		await cardsStore.getAll();
		$cardsStore;

		images = $cardsStore.data.map((card) => {
			return {
				id: card.id as string,
				name: '',
				imgurl: card.cardImage,
				attribution: card.webpageUrl
			};
		});
	});
</script>

{#if images}
	{#if browser}
		<div class="w-full h-auto flex items-center flex-col md:flex-row mt-[110px] md:mt-[140px]">
			<div class="w-full">
				<Carousel autoplay autoplayDuration={5000} autoplayProgressVisible class="w-full ">
					{#each images as image}
						<img src={image.imgurl} alt="" class="object-cover w-full h-[35rem]" />
					{/each}
				</Carousel>
			</div>
		</div>

		<div class=" w-full h-auto flex justify-center items-center gap-2 container mx-auto">
			<div
				class="w-full md:w-7/12 h-[200px] md:h-[250px] bg-gray-200 dark:dark:bg-gray-800 flex justify-around items-center"
				data-aos="fade-up"
			>
				<div
					class="w-full h-auto flex justify-around items-center hover:scale-[1.1] ease-in-out duration-[.4s]"
				>
					<img src="/Images/rice.png" alt="" width="150px" />

					<div class="flex justify-center items-center flex-col gap-5">
						<p class="text-4xl md:text-5xl dark:text-white">Rice</p>
						<p class="text-sm md:text-xl dark:text-white underline">Shop Now</p>
					</div>
				</div>
			</div>

			<div
				class="mx-3 md:mx-0 w-3/12 h-[200px] md:h-[250px] gap-4 bg-orange-200 dark:bg-orange-600 hidden md:flex justify-center items-center flex-col"
				data-aos="fade-down"
			>
				<div
					class="w-full h-auto flex flex-col gap-4 items-center hover:scale-[1.1] ease-in-out duration-[.4s]"
				>
					<img src="/Images/oil.png" alt="" width="120px" />

					<div class="flex justify-center items-center flex-col gap-2">
						<p class="text-3xl md:text-5xl dark:text-white">Oil</p>
						<p class="text-sm md:text-xl dark:text-white underline">Shop Now</p>
					</div>
				</div>
			</div>
		</div>

		<div
			class=" w-full h-auto flex justify-center items-center gap-2 my-2 md:mb-0 md:mt-2 container mx-auto"
		>
			<div
				class="w-full h-[200px] md:h-[250px] gap-4 bg-orange-200 dark:bg-orange-600 md:hidden flex justify-center items-center flex-col"
				data-aos="fade-up"
			>
				<div
					class="w-full h-auto flex flex-col gap-4 items-center hover:scale-[1.1] ease-in-out duration-[.4s]"
				>
					<img src="/Images/jam.png" alt="" width="120px" />

					<div class="flex justify-center items-center flex-col gap-2">
						<p class="text-3xl mad:text-5xl dark:text-white">Jam</p>
						<p class="text-sm md:text-xl dark:text-white underline">Shop Now</p>
					</div>
				</div>
			</div>

			<div
				class="w-full h-[200px] md:h-[250px] gap-4 bg-orange-200 dark:bg-orange-600 md:hidden flex justify-center items-center flex-col"
				data-aos="fade-up"
			>
				<div
					class="w-full h-auto flex flex-col gap-4 items-center hover:scale-[1.1] ease-in-out duration-[.4s]"
				>
					<img src="/Images/oil.png" alt="" width="120px" />

					<div class="flex justify-center items-center flex-col gap-2">
						<p class="text-3xl dark:text-white">Oil</p>
						<p class="text-sm md:text-xl dark:text-white underline">Shop Now</p>
					</div>
				</div>
			</div>
		</div>

		<div class=" w-full h-auto flex justify-center items-center gap-2 container mx-auto">
			<div
				class="w-3/12 h-[200px] md:h-[250px] gap-4 bg-orange-200 dark:bg-orange-600 hidden md:flex justify-center items-center flex-col"
				data-aos="fade-down"
			>
				<div
					class="w-full h-auto flex flex-col gap-4 items-center hover:scale-[1.1] ease-in-out duration-[.4s]"
				>
					<img src="/Images/jam.png" alt="" width="120px" />

					<div class="flex items-center flex-col gap-2">
						<p class="text-3xl md:text-5xl dark:text-white">Jam</p>
						<p class="text-sm md:text-xl dark:text-white underline">Shop Now</p>
					</div>
				</div>
			</div>

			<div
				class="w-full md:w-7/12 h-[200px] md:h-[250px] bg-gray-200 dark:dark:bg-gray-800 flex justify-around items-center"
				data-aos="fade-up"
			>
				<div
					class="w-full h-auto flex justify-around items-center hover:scale-[1.1] ease-in-out duration-[.4s]"
				>
					<img src="/Images/water.png" alt="" class="w-[150px] md:w-[200px]" />

					<div class="flex justify-center items-center flex-col gap-5">
						<p class="text-3xl md:text-5xl dark:text-white">Water</p>
						<p class="text-sm md:text-xl dark:text-white underline">Shop Now</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/if}

<style>
	.see_more {
		display: none;
	}
	.see_more_cont:hover .see_more {
		display: block;
		transition: all 0.3s ease-in-out;
	}

	.see_more_cont:hover {
		transition: all 0.3s ease-in-out;
	}

	.see_more_cont:hover .seemore_txt {
		color: #f17f18;
		font-weight: bold;
	}

	.seemore_txt {
		font-weight: bold;
	}
</style>
