import { toasts } from 'svelte-toasts';

export const succesfulToast = (name?: string, qunatity?: number, price?: number) => {
	toasts.add({
		title: 'Item Added Successfully',
		description: 'Name: ' + name + '\nQuantity: ' + qunatity + '\nPrice: ' + price,
		duration: 2500, // 0 or negative to avoid auto-remove
		placement: 'top-center',
		theme: 'dark',
		type: 'success'
	});

	// toast.remove()
};

export const ErrorToast = (errorMessage: string) => {
	toasts.add({
		title: 'Error While Adding Item',
		description: 'Error: ' + errorMessage,
		duration: 2500, // 0 or negative to avoid auto-remove
		placement: 'top-center',
		theme: 'dark',
		type: 'error'
	});

	// toast.remove()
};
