/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '$lib/firebase'; // Assuming you have initialized Firebase in a separate file
import { stationStore as ss } from '$lib/store/orders/station';
import type { InventoryInterface, ItemInterface, StationInterface } from '$lib/types/orders';
import { doc, onSnapshot } from 'firebase/firestore';
import { get, writable } from 'svelte/store';

const stationStore = () => {
	let unsubscribe: any;

	const { subscribe } = writable<ItemInterface[]>([], (set) => {
		const docRef = doc(db, 'station', get(stationId) as string);
		let _ss = get(ss);
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			const inventory: ItemInterface[] = [];
			const sationData = snapshot.data() as StationInterface;
			_ss = sationData;
			Object.keys(sationData.inventory).forEach((itemKey: keyof InventoryInterface) => {
				inventory.push(sationData.inventory[itemKey] as ItemInterface);
			});
			// Update this store
			set(inventory);
			// Update the local station store
			ss.set(_ss);
		});

		return () => unsubscribe();
	});
	return {
		subscribe
	};
};

export const stationId = writable<string | null>(null);
export const realtimeInventory = stationStore();
