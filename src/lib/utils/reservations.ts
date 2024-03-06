import { goto } from '$app/navigation';
import { user } from '$lib/store/auth';
import { stationStore } from '$lib/store/orders/station';
import { modalStore } from '$lib/store/overlays/modal';
import type { ItemInterface } from '$lib/types/orders';
import { Timestamp } from 'firebase/firestore';
import { get } from 'svelte/store';
import { updateStationInventoryDb } from './firestore';

export const getReservationTimer = (
	stationId: string,
	key: string,
	selectedItem: ItemInterface,
	tlcb: (tl: number) => void
) => {
	// If the item has a reservation
	const us = get(user);
	const ss = get(stationStore);
	const ms = get(modalStore);
	if (selectedItem.reservation) {
		// If the user is the one who made the reservation
		if (selectedItem.reservation.uid === us?.uid) {
			// reservedBySelf = true;
			console.log('Reserved by self');
		} else {
			// reservedBySelf = false;
			console.log('Reserved by someone else');
		}

		// Start the countdown
		const timeLeftInterval = setInterval(() => {
			if (selectedItem.reservation?.startTime && selectedItem.reservation?.duration) {
				// Get the current time
				const now = Timestamp.now().seconds;
				// Get the start time of the reservation
				const startTime = selectedItem.reservation?.startTime?.seconds;
				// Calculate the time left
				const timeLeft = selectedItem.reservation?.duration - (now - startTime);
				// Call the time left callback
				tlcb(timeLeft);
				// When the time is up
				if (timeLeft <= 0) {
					// Clear the interval

					// If the user is the one who made the reservation
					if (selectedItem.reservation && selectedItem.reservation?.uid === us?.uid) {
						// Modal to inform the user that the reservation has expired
						ms.open = true;
						ms.title = 'Tu reserva expiró';
						ms.content =
							'Tu reserva ha expirado. Por favor, escanea el código nuevamente o elige un nuevo paddle de nuestra estación.';
						ms.actions = {
							primary: {
								label: 'Entendido',
								action: () => {
									ms.open = false;
									modalStore.set(ms);
									goto('/');
								}
							},
							secondary: null
						};
						ms.onClose = () => {
							ms.open = false;
							modalStore.set(ms);
							goto('/');
						};
						modalStore.set(ms);
					}
					// Clear the interval
					clearInterval(timeLeftInterval as NodeJS.Timeout);
					// Update the inventory DB
					ss.inventory[key].state = 'available';
					ss.inventory[key].reservation = null;
					stationStore.set(ss);
					updateStationInventoryDb(stationId, ss.inventory);
				}
			}
		}, 1000);
		return timeLeftInterval;
	}
};
