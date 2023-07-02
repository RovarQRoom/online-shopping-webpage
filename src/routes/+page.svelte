<script>
	import { onMount } from "svelte";


	import CardsImagesCarousel from "../components/image-components/Cards-Images-Carousel.components.svelte";
	import categoryWritable from "$lib/store/firebase-store/category.firebase.store";
	import { Card } from "flowbite-svelte";
	import itemsWritable from "$lib/store/firebase-store/items.firebase.store";

    onMount(async () => {
        console.log('Page mounted');
        console.log("Categories", $categoryWritable.categories);
    });
</script>

<div class="p-12">
    <CardsImagesCarousel />
  </div>
<h1 class="flex font-bold justify-start ml-40 text-2xl tracking-wide text-gray-900 dark:text-white">Categories</h1>
<div class="flex flex-row justify-around flex-wrap">
{#each $categoryWritable.categories as category}
    <Card padding="sm" class="m-2" color="blue" >
        <a href="/">
            <img class="p-4 rounded-t-lg object-cover w-full h-32" src={category.category_image} alt="product 1" />
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
  
  
  <h1 class="flex font-bold justify-start ml-40 text-2xl tracking-wide text-gray-900 dark:text-white">Popular Items</h1>
  <div class="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full justify-center items-center">
    {#each $itemsWritable.items as items}
        <Card padding="sm" class="m-2 flex justify-center items-center" color="blue" >
            <a href="/">
                <img class="p-4 rounded-t-lg object-contain w-40 h-32" src={items.item_image} alt="product 1" />
            </a>
          <div class="px-5 pb-5 flex justify-center">
            <a href="/">
              <h5 class='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                {items.name}
              </h5>
            </a>
          </div>
        </Card>
        {/each}
      </div>  