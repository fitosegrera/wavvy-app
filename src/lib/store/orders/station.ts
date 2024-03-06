import type { StationInterface } from '$lib/types/orders';
import { writable } from 'svelte/store';

const initialStation: StationInterface = {
	id: null,
	name: null,
	loaded: false,
	inventory: {
		1: {
			id: 1,
			name: 'Tiburón',
			rentTime: 1,
			state: 'available',
			reservation: null,
			currentOrder: null
		},
		2: {
			id: 2,
			name: 'Picúa',
			rentTime: 1,
			state: 'available',
			reservation: null,
			currentOrder: null
		},
		3: {
			id: 3,
			name: 'Mojarra',
			rentTime: 1,
			state: 'available',
			reservation: null,
			currentOrder: null
		},
		4: {
			id: 4,
			name: 'Orca',
			rentTime: 1,
			state: 'available',
			reservation: null,
			currentOrder: null
		}
	},
	marketing: {
		discountRate: 0,
		hourlyRate: 0
	}
};

const stationStore = writable<StationInterface>(initialStation);

export { stationStore };
