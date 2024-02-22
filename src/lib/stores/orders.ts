import { generateId } from '$lib/utils/generateId';
import { writable } from 'svelte/store';

import type { CartInterface, OrderInterface } from '$types/orders';

const cart: CartInterface = {
	items: [],
	total: 0
};

const orders: OrderInterface[] = [
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

const orderHistoryStore = writable(orders);

const cartStore = writable(cart);

export { cartStore, orderHistoryStore };
