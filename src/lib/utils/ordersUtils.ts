import { cartStore } from '$lib/stores/orders';
import { stationStore } from '$lib/stores/station';
import type { InventoryInterface, ItemInterface } from '$types/station';
import { get } from 'svelte/store';
import { updateStationInventoryDb } from './firestoreUtils';

export const addToCart = (i: ItemInterface) => {
	const cs = get(cartStore);
	const ss = get(stationStore);

	if (!cs) return;

	const key = ('p' + i.id) as keyof typeof ss.inventory;

	cs.items.map((item: ItemInterface) => {
		if (item.id === i.id && item.rentTime) {
			item.rentTime += 1;
			return;
		}
	});

	const newStationStore = {
		...ss,
		inventory: {
			...ss.inventory,
			[key]: {
				...ss.inventory[key],
				state: 'reserved'
			}
		} as InventoryInterface
	};

	cs.items = [...cs.items, i];
	cs.total = (i.rentTime && cs.total + i.rentTime * ss.marketing.hourlyRate) as number;

	stationStore.set(newStationStore);
	cartStore.set(cs);

	updateStationInventoryDb(newStationStore.id as string, newStationStore.inventory);
};

export const removeFromCart = (i: ItemInterface) => {
	const cs = get(cartStore);
	const ss = get(stationStore);

	if (!cs) return;

	const key = ('p' + i.id) as keyof typeof ss.inventory;

	cs.items.map((item: ItemInterface) => {
		if (item.id === i.id) {
			cs.items = cs.items.filter((cartItem: ItemInterface) => cartItem === i);
			return;
		}
	});

	const newStationStore = {
		...ss,
		inventory: {
			...ss.inventory,
			[key]: {
				...ss.inventory[key],
				state: 'available'
			}
		} as InventoryInterface
	};

	cs.total = (i.rentTime && cs.total - i.rentTime * ss.marketing.hourlyRate) as number;

	stationStore.set(newStationStore);
	cartStore.set(cs);

	updateStationInventoryDb(newStationStore.id as string, newStationStore.inventory);
};

export const addTimeToItem = (i: ItemInterface) => {
	const cs = get(cartStore);
	const ss = get(stationStore);

	if (!cs) return;

	const key = ('p' + i.id) as keyof typeof ss.inventory;

	cs.items.map((item: ItemInterface, index: number) => {
		if (item.id === i.id && item.rentTime) {
			item.rentTime += 1;
			cs.items[index] = item;
			return;
		}
	});

	const newStationStore = {
		...ss,
		inventory: {
			...ss.inventory,
			[key]: {
				...ss.inventory[key],
				rentTime: ss.inventory[key].rentTime + 1
			}
		} as InventoryInterface
	};

	cartStore.set(cs);
	stationStore.set(newStationStore);

	updateStationInventoryDb(newStationStore.id as string, newStationStore.inventory);
};

export const removeTimeFromItem = (i: ItemInterface) => {
	const cs = get(cartStore);
	const ss = get(stationStore);

	if (!cs) return;

	const key = ('p' + i.id) as keyof typeof ss.inventory;

	cs.items.map((item: ItemInterface, index: number) => {
		if (item.id === i.id && item.rentTime) {
			item.rentTime -= 1;
			cs.items[index] = item;
			return;
		}
	});

	const newStationStore = {
		...ss,
		inventory: {
			...ss.inventory,
			[key]: {
				...ss.inventory[key],
				rentTime: ss.inventory[key].rentTime - 1
			}
		} as InventoryInterface
	};

	cartStore.set(cs);
	stationStore.set(newStationStore);

	updateStationInventoryDb(newStationStore.id as string, newStationStore.inventory);
};

export const sortObjectsById = (objects: ItemInterface[]): ItemInterface[] => {
	return objects.slice().sort((a, b) => a.id - b.id);
};
