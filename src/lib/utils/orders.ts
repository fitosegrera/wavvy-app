import { stationStore } from '$lib/store/orders/station';
import type { CurrentOrderInterface, ItemInterface } from '$lib/types/orders';
import { Timestamp } from 'firebase/firestore';
import { get } from 'svelte/store';
import { updateStationInventoryDb } from './firestore';

export const newOrder = (stationId: string, item: ItemInterface) => {
	// create new order
	const newOrder: CurrentOrderInterface = {
		uid: item?.reservation?.uid as string,
		oid: item?.reservation?.rid as string,
		duration: item?.rentTime as number,
		startTime: Timestamp.now()
	};

	// update item
	item.state = 'rented';
	item.currentOrder = newOrder;
	item.reservation = null;
	// get stationStore
	const ss = get(stationStore);
	// update station inventory
	ss.inventory[item.id] = item;
	// update stationStore DB
	updateStationInventoryDb(stationId, ss.inventory);
};

export const getOrderItemByUid = (uid: string, inventory: ItemInterface[]) => {
	const item = inventory.find((i) => i.currentOrder?.uid === uid);
	return item;
};
