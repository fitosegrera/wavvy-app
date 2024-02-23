import { generateId } from '$lib/utils/generateId';
import type { CartInterface, OrderInterface } from '$types/orders';
import type { ItemInterface } from '$types/station';
import { writable } from 'svelte/store';

const cart: CartInterface = {
	items: [],
	total: 0
};

const selectedItem: ItemInterface = {
	id: 0,
	name: null,
	rentTime: 1,
	state: 'available',
	reservation: {
		user: ''
	}
};

const pastOrders: OrderInterface[] = [
	{
		id: generateId(8),
		user: {
			name: 'John Doe',
			email: 'johndoe@email.com',
			role: 'client'
		},
		status: 'active',
		createdAt: new Date(),
		rentTime: 2
	},
	{
		id: generateId(8),
		user: {
			name: 'John Doe',
			email: 'johndoe@email.com',
			role: 'client'
		},
		status: 'payed',
		createdAt: new Date('2024-01-25T12:14:00'),
		rentTime: 1
	},
	{
		id: generateId(8),
		user: {
			name: 'John Doe',
			email: 'johndoe@email.com',
			role: 'client'
		},
		status: 'canceled',
		createdAt: new Date('2024-01-25T12:10:30'),
		rentTime: 0
	}
];

const orderHistoryStore = writable(pastOrders);

const cartStore = writable(cart);

const selectedItemStore = writable(selectedItem);

export { cartStore, orderHistoryStore, selectedItemStore };
