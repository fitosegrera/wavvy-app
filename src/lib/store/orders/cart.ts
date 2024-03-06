import type { CartInterface } from '$lib/types/orders';
import { writable } from 'svelte/store';

const cart: CartInterface = {
	items: [],
	total: 0
};

const cartStore = writable(cart);

export { cartStore };
