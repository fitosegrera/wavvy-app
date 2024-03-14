import type { OrderInterface, InventoryInterface, StationInterface } from '$lib/types/orders';
import type { TimersInterface } from '$lib/types/timers';
import {
	doc,
	getDoc,
	onSnapshot,
	setDoc,
	type DocumentData,
	addDoc,
	collection
} from 'firebase/firestore';
import { db } from '../firebase';

// Update the station inventory in the database
export const updateStationInventoryDb = (stationId: string, inventory: InventoryInterface) => {
	const docRef = doc(db, 'station', stationId as string);
	setDoc(docRef, { inventory: inventory }, { merge: true });
};

// Update orders in the database
export const updateOrdersDb = async (order: OrderInterface) => {
	const ordersCollection = collection(db, 'orders');
	await addDoc(ordersCollection, {
		uid: order.uid,
		oid: order.oid,
		duration: order.duration,
		startTime: order.startTime,
		total: order.total
	});
	console.log('Order added');
};

// Realtime Station inventory database updates
export const getStationDbUpdates = (
	stationId: string,
	callback: (station: StationInterface) => void
) => {
	const docRef = doc(db, 'station', stationId as string);
	onSnapshot(docRef, (doc) => {
		callback(doc.data() as StationInterface);
	});
};

// Get the station from the database
export const getStationDb = async (
	stationId: string,
	callback: (station: StationInterface) => void
) => {
	const docRef = doc(db, 'station', stationId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		callback(docSnap.data() as StationInterface);
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!');
	}
};

// Get terms and conditions and privacy policy from db
export const getLegalDataDb = (callback: (res: DocumentData | Error) => void) => {
	const docRef = doc(db, 'utils', 'legal');
	getDoc(docRef).then((doc) => {
		if (doc.exists()) {
			callback(doc.data());
		} else {
			callback(new Error('No such document!'));
		}
	});
};

// Get timer durations from db
export const getReservationDurationDb = (callback: (res: TimersInterface | Error) => void) => {
	const docRef = doc(db, 'utils', 'timers');
	getDoc(docRef).then((doc) => {
		if (doc.exists()) {
			callback(doc.data() as TimersInterface);
		} else {
			callback(new Error('No such document!'));
		}
	});
};

// Reset the station inventory in the database
const inventory: InventoryInterface = {
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
};

export const resetStationInventoryDb = (stationId: string) => {
	const docRef = doc(db, 'station', stationId);
	setDoc(docRef, { inventory: {} }, { merge: true });
	setDoc(docRef, { inventory: inventory }, { merge: true });
};
