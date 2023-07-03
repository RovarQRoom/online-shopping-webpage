<script>
	import { onMount } from "svelte";


	import CardsImagesCarousel from "../components/image-components/Cards-Images-Carousel.components.svelte";
	import categoryWritable from "$lib/store/firebase-store/category.firebase.store";
	import { Badge, Card, Indicator } from "flowbite-svelte";
	import itemsWritable from "$lib/store/firebase-store/items.firebase.store";
	import { HeartOutline } from "flowbite-svelte-icons";

    onMount(async () => {
        console.log('Page mounted');
        console.log("Categories", $categoryWritable.categories);
    });
</script>

<div class="p-12">
  <CardsImagesCarousel />
</div>
  <div class="flex justify-center w-full">
    <Badge border color="blue" class="text-2xl font-bold text-gray-100" ><span class="dark:text-gray-50 text-gray-800 p-1 px-4">
      Categories
    </span></Badge>
  </div>
<div class="flex flex-row justify-around flex-wrap">
{#each $categoryWritable.categories as category}
    <Card padding="sm" class="m-2 rounded-[2rem]" color="blue" >
        <a href="/">
            <img class="p-4 rounded-t-lg object-cover w-40 h-32" src={category.category_image} alt="product 1" />
        </a>
      <div class="px-5 pb-5 flex justify-center">
        <a href="/">
          <h5 class='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            {category.name}
          </h5>
        </a>
      </div>
    </Card>
    {/each}
  </div>  
  
  
  <div class="flex justify-center w-full mt-4">
    <Badge border color="dark" class="text-2xl font-bold text-gray-100" ><span class="dark:text-gray-50 text-gray-800 p-1 px-4">
      Popular Items
    </span></Badge>
  </div>
  <!-- <h1 class="flex font-bold justify-center text-2xl tracking-wide text-gray-900 dark:text-white">Popular Items</h1> -->
  <div class="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center">
    {#each $itemsWritable.items as items}
    <Card padding="sm" class="m-2 flex flex-col justify-between items-center rounded-[3rem]" color="dark" >
      <div class="flex justify-start items-start w-full">
        <HeartOutline size="32"/>
      </div>
      <a href="/">
        <img class="p-4 rounded-t-lg object-contain w-64 h-36" src={items.item_image} alt="product 1" />
      </a>
      <div class="px-5 pb-5 flex justify-start w-full flex-col">
        <a href="/">
          <h5 class='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            {items.name}
          </h5>
        </a>
        <span class="text-xl font-medium">{items.price} IQD</span>
      </div>
      <div class="relative justify-start w-20 left-0 bg-blue-400 bg-opacity-700 mt-auto">
        <button class="text-3xl font-bold text-gray-800">+</button>
      </div>
    </Card>
        {/each}
      </div>  