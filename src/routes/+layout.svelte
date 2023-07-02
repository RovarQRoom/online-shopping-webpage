<script lang="ts">
	import '../app.postcss';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input, Search, DarkMode } from 'flowbite-svelte';
  import { CartOutline, UserCircleSolid } from 'flowbite-svelte-icons';
	import { kubakLogo } from '../components/Images/kubak.logo';
	import { onMount } from 'svelte';
	import { categoryHandlers, itemsHandlers } from '$lib/store/firebase-store';
	import categoryWritable from '$lib/store/firebase-store/category.firebase.store';
	import itemsWritable from '$lib/store/firebase-store/items.firebase.store';

  let screenWidth:number;

  onMount(async () => {
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);

    await categoryHandlers.getCategories();
    await itemsHandlers.getItems(undefined, 'popularity', false); 
  });

  const updateScreenWidth = () => {
    screenWidth = window.innerWidth;
  }
</script>

{#if $categoryWritable && $itemsWritable}
<main class="bg-slate-100 dark:bg-gray-950">
  <div class="w-full h-full">
    <Navbar let:hidden let:toggle>
        <NavBrand href="/">
          <img
            src="{kubakLogo}"
            class="mr-3 h-6 sm:h-9"
            alt="Kubak"
          />
          <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white uppercase">
            Kubak Online Shopping
          </span>
        </NavBrand>
        <div class="flex md:order-2 xl:w-[50%] lg:w-[80%] lg:items-center md:w-full">
            <Search class="h-full w-full">
            </Search>
          {#if screenWidth > 1280}
          <NavUl class="md:order-1">
            <NavLi href="/" class="flex flex-row items-center">
              <UserCircleSolid  class="mx-1" size="30"/>
              Account
            </NavLi>
            <NavLi href="/" class="flex flex-row items-center">
              <CartOutline  class="mx-1" size="30"/>
              Cart</NavLi>
          </NavUl>
          {/if}
          <NavHamburger on:click={toggle} />
        </div>
        <DarkMode class="text-lg m-1">
          <svelte:fragment slot="lightIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"/></svg>
          </svelte:fragment>
          <svelte:fragment slot="darkIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"/></svg>
          </svelte:fragment>
        </DarkMode>
        <NavUl {hidden} class="w-full">
          <NavLi href="/" active={true}>Home</NavLi>
          <NavLi href="/about">Categories</NavLi>
          <NavLi href="/services">Services</NavLi>
          {#if screenWidth <= 1280}
          <NavLi href="/" class="flex flex-row items-center">
            <UserCircleSolid  class="mx-1" size="25"/>
            Account
          </NavLi>
          <NavLi href="/" class="flex flex-row items-center">
            <CartOutline  class="mx-1" size="25"/>
            Cart</NavLi>
            {/if}
          </NavUl>
        </Navbar>
      </div>
      
  <slot />
</main>
{:else}
<h1>Loading</h1>
{/if}

