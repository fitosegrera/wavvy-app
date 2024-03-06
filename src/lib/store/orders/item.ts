import type { ItemInterface } from '$lib/types/orders';
import { writable } from 'svelte/store';

const selectedItem: ItemInterface = {
	id: 0,
	name: null,
	rentTime: 1,
	state: 'available',
	reservation: null
};

const selectedItemStore = writable(selectedItem);

export { selectedItemStore };
