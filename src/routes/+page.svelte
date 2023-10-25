<script lang="ts">
  import "../app.postcss"
	import categoryWritable from "$lib/store/firebase-store/category.firebase.store";
	import { Badge, Card } from "flowbite-svelte";
	import itemsWritable, { itemsCollection, itemsHandlers } from "$lib/store/firebase-store/items.firebase.store";
	import { HeartOutline, MinusSolid, PlusSolid } from "flowbite-svelte-icons";
	import cart, { cartHandlers } from '$lib/store/carts.store';
	import type { Items } from "$lib/DTO";
	import CardsImagesCarousel from "../components/image-components/Cards-Images-Carousel.components.svelte";
  import Footer from "../components/footer.svelte"
	import { auth } from "$lib/firebase/firebase";
	import { onMount } from "svelte";
	import { favouriteStore } from "$lib/store/firebase-store/favourite.firebase.store";
async function addItemToCart(item: Items) {
        // if the item is not in the cart, add it to the cart
       cartHandlers.addToCart(item);
       console.log("Checking Condition",$cart.some((i) => i.id === item.id));
       isInCart(item);
}

let favoriteItems:{
  itemsId:string[],
  itemsNames:string[],
  userId:string | null,
} = {
  itemsId:[],
  itemsNames:[],
  userId:null
};

function removeItemFromCart(item: Items) {
        // if the item is in the cart, remove it from the cart
        cartHandlers.removeFromCart(item);
}

  // a function to check if an item is in the cart or not
  function isInCart(item: Items) {
    console.log("Item", $cart);
    console.log(
      "Checking if item is in cart",
      $cart.some((i) => i.id === item.id)
    );
      return $cart.some((i) => i.id === item.id);
  }
  
  async function toggleLike(id?: string, name?: string) {
  if (favoriteItems.itemsId.includes(id!)) {
    favoriteItems.itemsId = favoriteItems.itemsId.filter((item) => item !== id);
    favoriteItems.itemsNames = favoriteItems.itemsNames.filter((item) => item !== name);
  } else {
    favoriteItems.itemsId = [...favoriteItems.itemsId, id!];
    favoriteItems.itemsNames = [...favoriteItems.itemsNames, name!];
  }

  // if the user is not authenticated, save the favorite items in the local storage, when the user logs in, we will save them in the database.
   
  if (auth.currentUser != null) {
    await favouriteStore.create(favoriteItems,auth.currentUser?.uid!);
  } else {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    
  }
}

  onMount(async()=>{
    console.log("Auth",auth.currentUser);
    
    if(auth.currentUser != null){
      await favouriteStore.get(auth.currentUser?.uid!);
      favoriteItems = {
        itemsId: $favouriteStore.itemsId,
        itemsNames: $favouriteStore.itemsNames,
        userId: auth.currentUser?.uid!,
      };

      console.log("Favorite Items in auth",favoriteItems);
      
    }else{
      favoriteItems = {
        itemsId: JSON.parse(localStorage.getItem("favoriteItems")!).itemsId,
        itemsNames: JSON.parse(localStorage.getItem("favoriteItems")!).itemsNames,
        userId: null,
      };
    }

  })

</script>

<div class="w-full mt-36 md:mt-44">
  <CardsImagesCarousel />
</div>
  <div class="flex justify-center w-full mt-24">
    <Badge border  class="text-2xl font-bold text-gray-100 rounded-3xl border-black" ><span class="dark:text-gray-50 text-gray-800 p-1 px-4">
      Categories
    </span></Badge>
  </div>
<div class="flex justify-center flex-wrap mt-5">
{#each $categoryWritable.categories as category}

    <Card class="m-2 rounded-2xl w-44 h-44 flex justify-center items-center flex-columns shadow-none border border-black dark:border-white hover:border-[#f17f18] dark:hover:border-[#f17f18] transition duration-300 ease-in-out">
        <a href="/">
            <img class="rounded-t-lg object-cover p-3 w-40 h-32" src={category.category_image} alt="product 1" />
        </a>
      <div class=" flex justify-center">
        <a href="/">
          <h5 class='text-xl  font-semibold  text-gray-900 dark:text-white'>
            {category.name}
          </h5>
        </a>
      </div>
    </Card>
    {/each}
  </div>  
  
  
  <div class="flex justify-center w-full mt-32">
    <Badge border class="text-2xl font-bold border-black text-gray-100 rounded-3xl" ><span class="dark:text-gray-50 text-gray-800 p-1 px-4">
      Popular Items
    </span></Badge>
  </div>
  <!-- <h1 class="flex font-bold justify-center text-2xl tracking-wide text-gray-900 dark:text-white">Popular Items</h1> -->
  <div class="w-full container mx-auto flex justify-center items-center gap-px flex-wrap mt-5" >
    {#if $cart}
    {#each $itemsWritable.items as items, index}
    <Card class="m-2 w-44 h-auto md:w-64 flex flex-col justify-between border-black dark:border-white items-center rounded-2xl" color="dark" >
      <div class="flex justify-start items-start w-full">
       <button on:click={()=>toggleLike(items.id,items.name)}>
        {#if favoriteItems.itemsId.includes(items.id)}
        <i class="fa-solid fa-heart fa-lg cursor-pointer text-red-600" id="heart"></i>
        {:else}
        <i class="fa-regular fa-heart fa-lg cursor-pointer" id="heart"></i>
        {/if}
    </button>
    </div>
      <a href="/">
        <img class="p-4 rounded-t-lg object-contain w-36 h-36" src={items.item_image} alt="product 1" />
      </a>
      <div class="px-5 pb-5 flex justify-start w-full flex-col">
        <a href="/">
          <h5 class='text-lg text-center font-semibold tracking-tight text-gray-900 dark:text-white'>
            {items.name}
          </h5>
        </a>
        <span class="text-md text-center font-medium ">{items.price} IQD</span>
      </div>
      <div class="flex justify-center bg-blue-400 bg-opacity-700 rounded-full items-center transition-all duration-500" 
     style="width: {$cart.some((i) => i.id === items.id) ? '75%' : '36px'}">
  {#if $cart.some((i) => i.id === items.id)}
  <div class="flex justify-between w-full text-white">
    <button on:click={()=>{addItemToCart(items);
    }} class="justify-start p-2 text-white"><PlusSolid class="dark:hover:text-orange-500 hover:text-orange-600 text-white transition-all"/></button>
    <span class="flex justify-center items-center text-xl text-center font-bold dark:text-gray-100">{($cart.find(i => i.id === items.id))?.quantity}</span>
    <button on:click={()=>{removeItemFromCart(items);
    }}  class="justify-end p-2"><MinusSolid class="dark:hover:text-orange-500 hover:text-orange-600 text-white transition-all"/></button>
  </div>
  {:else}
  <button on:click={()=>{addItemToCart(items)}}  class="text-3xl font-boldflex justify-center p-2"><PlusSolid class="dark:hover:text-orange-500 hover:text-orange-600 text-white transition-all"/></button>
  {/if}
</div>
</Card>

{/each}
{/if}
</div>  

<Footer />