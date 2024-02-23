import type { StationInterface } from '$types/station';
import { writable } from 'svelte/store';

const initialStation: StationInterface = {
	id: null,
	name: null,
	loaded: false,
	inventory: {
		p1: {
			id: 1,
			name: null,
			state: null,
			rentTime: null
		},
		p2: {
			id: 2,
			name: null,
			state: null,
			rentTime: null
		},
		p3: {
			id: 3,
			name: null,
			state: null,
			rentTime: null
		},
		p4: {
			id: 4,
			name: null,
			state: null,
			rentTime: null
		}
	},
	marketing: {
		discountRate: 0,
		hourlyRate: 0
	}
};

const stationStore = writable<StationInterface>(initialStation);

export { stationStore };
