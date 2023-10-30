<script>
	import {
		Footer,
		FooterLinkGroup,
		FooterBrand,
		FooterLink
	} from 'flowbite-svelte';
</script>

<Footer
	footerType="logo"
	class="mt-5 w-full flex justify-center items-center flex-col px-0 py-0 md:px-0 md:py-0 "
>
	<div class="sm:flex sm:items-center sm:justify-between flex flex-col gap-11">
		<div class="w-full h-auto flex justify-center items-center gap-3 flex-col mt-5">
			<FooterBrand src="/Images/kubak.logo.svg" alt="kubak Logo" imgClass="w-23 " />
			<h1 class="text-bold dark:text-white">KUBAK ONLINE SHOPPING</h1>
		</div>
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="/">Home</FooterLink>
			<FooterLink href="/">Categories</FooterLink>
			<FooterLink href="/">Favorite</FooterLink>
		</FooterLinkGroup>
	</div>

	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

	<div
		class="mapouter text-right w-full h-auto mb-8 rounded-lg flex justify-center items-center flex-wrap gap-5"
	>
		<div
			class="gmap_canvas overflow-hidden bg-none flex justify-center items-center h-[340px] border-solid border-4 border-[#f17f18] rounded-lg"
		>
			<!-- svelte-ignore a11y-missing-attribute -->
			<iframe
				class="gmap_iframe w-full h-[340px] rounded-lg dark:grayscale dark:invert"
				width="100%"
				frameborder="0"
				scrolling="no"
				marginheight="0"
				marginwidth="0"
				src="https://maps.google.com/maps?width=320&amp;height=340&amp;hl=en&amp;q=Kubak&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
			/>
		</div>

		<div class="w-[320px] h-auto flex justify-center items-center gap-3">
			<div class="w-full h-auto">
				<div
					class="w-[160px] h-[160px] border border-solid border-gray-300 border-3 mb-3 rounded-lg flex items-center justify-center flex-col text-center gap-4"
				>
					<img src="/Images/map.png" width="62px" height="62px" alt="" />
					<h5 class="text-xs text-gray-600 dark:text-white">
						Malik Mahmood Street/Mako Mall floor 2
					</h5>
				</div>

				<div
					class="w-[160px] h-[160px] border border-solid border-gray-300 border-3 rounded-lg flex items-center justify-center flex-col text-center gap-4"
				>
					<img src="/Images/mail.png" width="62px" height="62px" alt="" />
					<h5 class="text-xs text-gray-600 dark:text-white">kubak@gmail.com</h5>
				</div>
			</div>

			<div class="w-full h-auto">
				<div
					class="w-[160px] h-[160px] border border-solid border-gray-300 border-3 mb-3 rounded-lg flex items-center justify-center flex-col text-center gap-4"
				>
					<img src="/Images/telephone.png" width="62px" height="62px" alt="" />
					<h5 class="text-xs text-gray-600 dark:text-white">0770 000 00 00</h5>
				</div>

				<div
					class="w-[160px] h-[160px] border border-solid border-gray-300 border-3 rounded-lg flex items-center justify-center flex-col text-center gap-4"
				>
					<img src="/Images/www.png" width="62px" height="62px" alt="" />
					<h5 class="text-xs text-gray-600 dark:text-white">www.kubakgroup.com</h5>
				</div>
			</div>
		</div>
	</div>

	<div class="w-full flex justify-center items-center h-auto py-3 bg-[#f17f18]">
		<h2 class="text-white">Developed by Kubak</h2>
	</div>
</Footer>

<style>
	.gmap_iframe {
		width: 620px !important;
		height: 340px !important;
	}
</style>
