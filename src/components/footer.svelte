<script>
    import { Footer, FooterCopyright, FooterLinkGroup, FooterBrand, FooterLink } from 'flowbite-svelte';
    import { kubakLogo } from './Images/kubak.logo';
    import { AspectRatio } from '@mantine/core';
  </script>
  


  <style>
  .gmap_iframe {width:620px!important;height:340px!important;}
  </style>



  <Footer footerType="logo" class="mt-5 w-full flex justify-center items-center flex-col px-0 py-0 md:px-0 md:py-0">
    <div class="sm:flex sm:items-center sm:justify-between flex flex-col gap-11">
        <div class="w-full h-auto flex justify-center items-center gap-3 flex-col">
      <FooterBrand  src="{kubakLogo}" alt="kubak Logo" imgClass="w-23 "  />
      <h1 class="text-bold">KUBAK ONLINE SHOPPING</h1>
    </div>
      <FooterLinkGroup ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
        <FooterLink href="/">Home</FooterLink>
        <FooterLink href="/">Categories</FooterLink>
        <FooterLink href="/">Favourite</FooterLink>
      </FooterLinkGroup>
    </div>
   
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

 

   
      
      <div class="mapouter text-right w-full h-auto mb-8  rounded-lg flex justify-center items-center flex-wrap gap-3">
        <div class="gmap_canvas overflow-hidden bg-none flex justify-center items-center  h-[340px] rounded-lg">
          <iframe class="gmap_iframe w-full h-[340px] border border-solid border-4 border-[#f17f18] rounded-lg dark:grayscale dark:invert" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=320&amp;height=340&amp;hl=en&amp;q=Kubak&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
          </div>
       



<div class="w-[320px] h-auto flex justify-center items-center">
  

  <div class="w-full h-auto">

    <div class="w-[150px] h-[150px] border border-solid border-gray-300 border-3 mb-3 rounded-lg">

    </div>

    <div class="w-[150px] h-[150px]  border border-solid border-gray-300 border-3 rounded-lg">

    </div>

  </div>

  <div class="w-full h-auto">

    <div class="w-[150px] h-[150px]  border border-solid border-gray-300 border-3 mb-3 rounded-lg">

    </div>

    <div class="w-[150px] h-[150px]  border border-solid border-gray-300 border-3 rounded-lg">

    </div>

  </div>


</div>
      



    </div>

    <div class="w-full flex justify-center items-center h-auto py-3 bg-[#f17f18] ">
        <h2 class="text-white">Developed by Kubak</h2>
    </div>
  </Footer>