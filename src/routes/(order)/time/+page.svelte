<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_SOCKET_AUTH_TOKEN } from '$env/static/public';
	import { BackButton, Button, FlexBox, Text } from '$lib/components';
	import { user } from '$lib/stores/auth';
	import { cartStore, selectedItemStore } from '$lib/stores/orders';
	import { reservationsAuthStore } from '$lib/stores/reservations';
	import { result } from '$lib/stores/scanner';
	import { stationStore } from '$lib/stores/station';
	import { classNames } from '$lib/utils/classNames';
	import { updateStationInventoryDb, updateUserReservationsDb } from '$lib/utils/firestoreUtils';
	import { addToCart } from '$lib/utils/ordersUtils';
	import socket from '$lib/utils/socket';
	import type { ItemInterface, ItemState } from '$types/station';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const handleReservations = async () => {
		// generate token and save it on DB
		updateUserReservationsDb($user.user?.uid as string, {
			reservationTimeOut: 5000,
			userId: $user.user?.uid as string,
			stationId: $stationStore.id as string,
			reservedItems: $cartStore?.items,
			total: $cartStore.total
		});
	};

	let rentTime = 1;
	$: key = '' as keyof typeof $stationStore.inventory;

	$reservationsAuthStore = {
		userId: $user.user?.uid ?? '',
		room: 'reservations',
		authToken: PUBLIC_SOCKET_AUTH_TOKEN
	};

	// handle socket connection with server
	const authToken = $reservationsAuthStore.authToken;
	const wavvySocket = socket.init(authToken);
	const res = socket.onConnect(wavvySocket);
	const dis = socket.onDisconnect(wavvySocket);
	const err = socket.onConnectError(wavvySocket);
	socket.onReservation(wavvySocket);
	socket.onReservationTimeUpdate(wavvySocket);

	onMount(() => {
		if ($result) {
			const parsedResult = $result.split('%');
			const collection = parsedResult[0];
			const stationId = parsedResult[1];
			const docId = parsedResult[2];
			const itemId = parsedResult[3];

			key = 'p' + itemId;
			$selectedItemStore = $stationStore.inventory[key] as ItemInterface;
		}
	});

	const cancelReservation = (key: keyof typeof $stationStore.inventory) => {
		if ($stationStore.inventory[key] && $stationStore.id) {
			$stationStore.inventory[key].reservation.user = '' as string;
			$stationStore.inventory[key].state = 'available' as ItemState;
			updateStationInventoryDb($stationStore.id, $stationStore.inventory);
		}
	};
</script>

<FlexBox intent="flexColTop" py="medium" gap="medium" class="w-full h-full">
	<FlexBox intent="flexRowLeft" gap="small" class="w-full">
		<BackButton
			href="/scanner"
			onBack={() => {
				$result = null;
				cancelReservation(key);
			}} />
		<Text>Volver</Text>
	</FlexBox>
	{#if $selectedItemStore.state === 'available' || ($selectedItemStore.state === 'reserved' && $selectedItemStore.reservation.user === $user.user?.uid)}
		<FlexBox intent="flexColCenter">
			<Text intent="p1">Reservaste a</Text>
			<Text intent="h3">{$selectedItemStore.name}</Text>
		</FlexBox>
		<div
			class={classNames(
				'image ',
				$selectedItemStore.state === 'available' || $selectedItemStore.state === 'reserved'
					? ''
					: 'grayscale opacity-40'
			)}
			style="background-image: url(/images/paddle-transparent-512.png)" />
		<FlexBox intent="flexColCenter" class="">
			<Text intent="p1">Cuantas horas deseas usarlo?</Text>
		</FlexBox>
		<FlexBox intent="flexRowCenter" gap="xsmall" class="">
			<Button
				intent="text"
				class={classNames(
					$selectedItemStore.state === 'available' ||
						$selectedItemStore.state === 'reserved'
						? ''
						: 'grayscale opacity-40',
					'text-4xl'
				)}
				onClick={() => {
					if (rentTime !== 1) {
						rentTime--;
					} else {
						rentTime = 1;
					}
					console.log(rentTime);
				}}>
				<Icon icon="mdi:minus" />
			</Button>
			<Text
				intent="h2"
				class={classNames(
					$selectedItemStore.state === 'available' ||
						$selectedItemStore.state === 'reserved'
						? ''
						: 'grayscale opacity-40'
				)}>
				{rentTime}
			</Text>
			<Button
				intent="text"
				class={classNames(
					$selectedItemStore.state === 'available' ||
						$selectedItemStore.state === 'reserved'
						? ''
						: 'grayscale opacity-40',
					'text-4xl'
				)}
				onClick={() => {
					if (rentTime !== 4) {
						rentTime++;
					} else {
						rentTime = 4;
					}
					console.log(rentTime);
				}}>
				<Icon icon="mdi:plus" />
			</Button>
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="medium">
			<Button
				intent="primary"
				onClick={() => {
					$selectedItemStore.rentTime = rentTime;
					addToCart($selectedItemStore);
					goto('/review');
				}}>
				Siguiente
			</Button>
			<Button
				intent="text"
				onClick={() => {
					$result = null;
					goto('/scanner');
				}}>
				Escanear de nuevo
			</Button>
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="small">
			<Text intent="p1" class="text-center">
				Completa el proceso de alquiler antes de que tu reserva termine.
			</Text>
			<Text intent="p1" variant="error" class="text-center">Tu reserva expira en xxx</Text>
		</FlexBox>
	{:else if $selectedItemStore.state === 'unavailable'}
		<Text intent="h6">El paddle seleccionado no esta disponible</Text>
	{/if}
</FlexBox>

<style>
	.image {
		height: 100px;
		width: 80px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
