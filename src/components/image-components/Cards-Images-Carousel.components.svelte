<script lang="ts">
	import { onMount } from 'svelte';
	import type { Card } from '../../lib/DTO';
	import { cardsHandlers } from '../../lib/store/firebase-store';
  //@ts-ignore
  import Carousel from 'svelte-carousel';
import { browser } from '$app/environment';
	import { Img } from 'flowbite-svelte';
    
  let cardData:Card[];
  let images: { id: number; name: string; imgurl: string; attribution: string; }[];
    onMount(async () => {
        console.log('Carousel mounted');

        cardData = (await cardsHandlers.getCards())?.cardsData ?? [];

        images = cardData.map((card,index) => {
            return {
                id: index,
                name: "",
                imgurl: card.image_url,
                attribution: card.webpage_url,
            }
        }) ;

        console.log(images);
        
    });
</script>

{#if images}
{#if browser}
  <Carousel
  autoplay
  autoplayDuration={10000}
  arrows={false}
  dots={false}
  class="rounded-lg"
  >
    {#each images as image}
      <Img href={image.attribution} src={image.imgurl} alt="" class="object-cover w-full h-[35rem] rounded-3xl px-2"/>
    {/each}
  </Carousel>
{/if}
{/if}