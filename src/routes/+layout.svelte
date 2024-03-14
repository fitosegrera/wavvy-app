<script lang="ts">
	import { goto } from '$app/navigation';
	import { nicknames, user } from '$lib/store/auth';
	import { appScreensStore } from '$lib/store/navigation/bottomBarItems';
	import { reservationDurationStore } from '$lib/store/orders/timers';
	import { realtimeInventory, stationId } from '$lib/store/realtimeDb';
	import type { ItemInterface } from '$lib/types/orders';
	import type { TimersInterface } from '$lib/types/timers';
	import { getReservationDurationDb, resetStationInventoryDb } from '$lib/utils/firestore';
	import { onMount } from 'svelte';
	import '../app.css';

	let data: ItemInterface[];

	// Define the station ID
	$stationId = 'carey-beach';

	onMount(() => {
		// resetStationInventoryDb('carey-beach');

		// Subscribe to firebase auth and listen for auth updates
		const unsubscribeUser = user.subscribe((value) => {
			// If user is logged in
			if (value) {
				$nicknames.initial = value.email?.charAt(0).toUpperCase() as string;
				$nicknames.displayName = value.email?.split('@')[0] as string;
				goto('/');
				$appScreensStore.forEach((s, i) => {
					$appScreensStore[i].active = false;
				});
				$appScreensStore[0].active = true;
				console.log('User is logged in');
			} else {
				// If user is not logged in
				console.log('User is not logged in');
				goto('/get-started');
			}
		});

		// Subscribe to the station firestore DB to get realtime updates
		const unsubscribeInventory = realtimeInventory.subscribe((value: ItemInterface[]) => {
			data = value;
		});

		// Get reservation timer duration from db
		getReservationDurationDb((timers: TimersInterface | Error) => {
			// If there is an error
			if (timers instanceof Error) {
				console.error(timers);
				return;
			}
			// Set the reservation duration
			$reservationDurationStore = timers.reservation;
		});

		return () => {
			unsubscribeUser();
			unsubscribeInventory();
		};
	});
</script>

<svelte:head>
	<title>Wavvy</title>
</svelte:head>

<slot />
