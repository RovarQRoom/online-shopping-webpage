<script lang="ts">
	//@ts-ignore
	import SvelteOtp from '@k4ung/svelte-otp';
	import { onMount } from 'svelte';
	import { Avatar } from 'flowbite-svelte';
	import { Modal } from 'flowbite-svelte';
	import { authStore } from '$lib/store/firebase-store';
	import { phone } from 'phone';
	import { account } from '$lib/appwrite/appwrite';
	import { goto } from '$app/navigation';
	let defaultModal = false;
	let secret: string = '';
	let auth: string = '';

	onMount(async () => {
		particlesJS.load('particles-js', '/assets/particles.json');
		getUserData();
	});

	let userInput = '';

	async function authentication(phoneNumber: string) {
		if (phone(phoneNumber, { country: 'IQ' }).isValid) {
			var validPhone = phone(phoneNumber, { country: 'IQ' }).phoneNumber;
			auth = await authStore.sign_up(validPhone!);
			if (auth) {
				defaultModal = true;
			}
		}
	}

	async function verify(validation: string, secret: string) {
		const user = await authStore.sign_in(validation, secret);

		if(user){
			if(user.name && user.prefs.gender){
				goto('/');
			}else{
				goto('/registration');
			}
		}
	}

	$: buttonActive = userInput && userInput.length >= 11;

	function getUserData() {
		account.get().then((response) => {
			if (response.name && response.prefs.gender) {
				goto('/');
			}else{
				goto('/registration');
			}
		});
	}

</script>

<div
	class="flex flex-col w-full bg-[#333333] h-screen justify-center items-center"
	id="particles-js"
>
	<div
		class="absolute w-5/6 md:w-3/6 lg:w-4/12 gap-3 h-[520px] shadow-2xl py-10 px-5 rounded-xl flex flex-col justify-center items-center bg-gradient-to-r from-[#00000018] to-[#212121b2] backdrop-blur-md"
	>
		<Avatar src="/Images/kubak.jpg" class="w-[180px] h-[180px] mb-11" />
		<div class="  flex justify-center items-center">
			<!-- svelte-ignore missing-declaration -->
		</div>
		<br
			class=" flex justify-center items-center w-full md:w-4/5 max-w-2xl my-11 rounded-lg px-3 py-5"
		/>
		<div class="flex justify-center items-center w-full h-12 rounded-md gap-px">
			<div
				class="w-[60px] md:w-[90px] flex justify-center items-center gap-2 bg-white rounded-md h-[50px] md:h-[55px]"
			>
				<img src="/Images/iraq.png" alt="" class="w-4 md:w-8" />
			</div>
			<input
				type="tel"
				placeholder="Phone Number"
				class="py-3 rounded-md w-full text-center text-md md:text-lg tracking-[.15em]"
				oninput="this.value = this.value.replace(/[^0-9]/g, '')"
				onKeyPress="if(this.value.length==11) return false;"
				required
				bind:value={userInput}
			/>
		</div>

		<button
			type="submit"
			disabled={!buttonActive}
			on:click={() => {
				authentication(userInput);
			}}
			id="submit-btn"
			class="w-full">Send</button
		>
	</div>
</div>

<Modal title="Phone Number Verification" bind:open={defaultModal} autoclose>
	<p class="text-xl leading-relaxed text-gray-500 dark:text-gray-400 text-center">OTP Number</p>
	<div class="w-full flex justify-center">
		<SvelteOtp
			numberOnly
			inputClass="rounded-md bg-gray-200 "
			separatorClass=" text-xl font-bold text-black rounded-full"
			separator="-"
			inputStyle="width:35px; height:35px; border:2px solid #f17f18; color:#000;"
			wrapperClass="flex justify-center"
			bind:value={secret}
			numberOfInputs={6}
		/>
	</div>

	<div class="w-full flex justify-center items-center">
		<p
			class="w-32 flex justify-center items-center underline mt-5 hover:text-[#f17f18] cursor-pointer"
		>
			Resend Code
		</p>
	</div>

	<svelte:fragment slot="footer">
		<div class="w-full flex justify-center">
			<button
				type="submit"
				id="submit-btn"
				class="w-4/6 flex justify-center items-center text-center"
				on:click={() => verify(auth, secret)}>Verify</button
			>
		</div>
	</svelte:fragment>
</Modal>

<style>
	::placeholder {
		text-align: center;

		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 0;
	}
	@media (max-width: 768px) {
		::placeholder {
			font-size: 10px;
		}
	}

	input:focus {
		outline: none !important;
		border: 2px solid #f17f18;
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
		box-shadow: 0 0 12px #000000;
	}
</style>
