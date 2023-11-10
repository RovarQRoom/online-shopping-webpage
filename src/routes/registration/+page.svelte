<script>
 import { onMount } from 'svelte';
 import { Label, Input } from 'flowbite-svelte';
onMount(async () => {
    particlesJS.load('particles-js', '/assets/particles-2.json');
    
    
});

</script>



<div
	class="flex w-full bg-[#ffffff] h-screen justify-center items-center"
	id="particles-js"
>
	<div class="absolute w-5/6  container mx-auto  gap-3 h-[620px] shadow-2xl   rounded-xl flex justify-center items-center bg-gradient-to-r  from-[#ffffffa2] to-[#ffffffc9] backdrop-blur-md">
		<div class="log-img w-1/2 bg-gray-100 hidden md:flex justify-center items-center  h-full">
		</div>
		



		<div class="w-full md:w-1/2  h-full flex flex-col justify-start items-center pt-11 pl-3 md:pl-0 pr-3">
			<p class="mb-8 text-xl font-bold">Create Your Profile</p>
			  
<div class="w-full h-auto flex justify-center items-center">

	<div class="rounded-full relative flex justify-start w-28 h-28 bg-white border border-solid border-3 border-black"></div>
<div class="w-8 h-8 rounded-full bg-[#f17f18] absolute flex justify-center items-center">

	<input type="file" class="absolute  z-40 w-8 h-8 rounded-full opacity-0">
	<i class="fa-solid fa-camera" style="color: #ffffff;"></i>
</div>
</div>



			<p class="text-start w-2/3 ">Name</p>
			  <Input id="disabled-input" type="text" class="mb-6 w-2/3 font-bold"  />


			  <p class="text-start w-2/3 ">Gender</p>
			  <select name="" id="" class="w-2/3 rounded-lg font-bold" >

				  <option value="">Male</option>
				  <option value="">Female</option>
			  </select>

			  <p class="text-start w-2/3 mt-6 ">Birthday</p>
			  <Input id="date" type="date" class="mb-6 w-2/3 font-bold" />

			  <button
				type="submit"
				id="submit-btn"
				class="w-2/3 flex justify-center items-center text-center">Register</button
			>
		</div>
		



		</div>
</div>



<style>
	.log-img{
		background-image: url(/Images/Login.svg);
		width: 50%;
		height: 100%;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		
	}



	button {
		color: #fff;
		padding: 15px 25px;
		background-color: #f17f18;
		background-image: radial-gradient(
				93% 87% at 87% 89%,
				rgba(0, 0, 0, 0.23) 0%,
				transparent 86.18%
			),
			radial-gradient(
				66% 66% at 26% 20%,
				rgba(255, 255, 255, 0.55) 0%,
				rgba(255, 255, 255, 0) 69.79%,
				rgba(255, 255, 255, 0) 100%
			);
		box-shadow: inset -3px -3px 9px rgba(198, 147, 9, 0.25), inset 0px 3px 9px rgb(216, 138, 4),
			inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3),
			inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
		border-radius: 14px;
		font-weight: bold;

		transition: 0.3s ease-out;
		border: 0;

		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;

		cursor: pointer;
	}

	button:hover {
		background-color: #fff;
		box-shadow: inset -3px -3px 9px rgba(198, 147, 9, 0.25), inset 0px 3px 9px rgb(255, 255, 255),
			inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3),
			inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
		color: #f17f18;
		transition: 0.3s ease-out;
		box-shadow: 0 15px 40px .5px  #00000030;
	}


input[type="file"]{
	color: transparent;
	
}


</style>