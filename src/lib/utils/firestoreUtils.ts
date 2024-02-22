import type { ReservationsInterface } from '$types/reservations';
import type { InventoryInterface } from '$types/station';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const updateStationInventoryDb = (stationId: string, inventory: InventoryInterface) => {
	const docRef = doc(db, 'station', stationId as string);
	setDoc(docRef, { inventory: inventory }, { merge: true });
};

export const updateUserReservationsDb = (userId: string, reservations: ReservationsInterface) => {
	const docRef = doc(db, 'users', userId as string);
	setDoc(docRef, { reservations: reservations }, { merge: true });
};
