<!-- src/routes/auth/home/+page.svelte -->
<script lang="ts">
	import { PUBLIC_SOCKET_AUTH_TOKEN } from '$env/static/public';
	import { BackButton, Button, Grid, PayU, Spinner, Text } from '$lib/components';
	import FlexBox from '$lib/components/core/Container/FlexBox.svelte';
	import { db } from '$lib/firebase';
	import { user } from '$lib/stores/auth';
	import { notificationStore } from '$lib/stores/notification';
	import { cartStore } from '$lib/stores/orders';
	import { reservationTimersStore, reservationsAuthStore } from '$lib/stores/reservations';
	import { stationStore } from '$lib/stores/station';
	import { classNames } from '$lib/utils/classNames';
	import { updateUserReservationsDb } from '$lib/utils/firestoreUtils';
	import { getCurrentTime } from '$lib/utils/getCurrentTime';
	import {
		addTimeToItem,
		addToCart,
		removeFromCart,
		removeTimeFromItem,
		sortObjectsById
	} from '$lib/utils/ordersUtils';
	import socket from '$lib/utils/socket';
	import type { InventoryInterface, ItemInterface } from '$types/station';
	import Icon from '@iconify/svelte';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';

	$stationStore.id = 'carey-beach';
	$stationStore.name = 'Carey Beach';

	let loaded = false;

	// Create reservations
	const handleReservations = async () => {
		// generate token and save it on DB
		updateUserReservationsDb($user.user?.uid as string, {
			reservationTimeOut: 5000,
			userId: $user.user?.uid as string,
			stationId: $stationStore.id as string,
			reservedItems: $cartStore?.items,
			total: total
		});
	};

	/////////////////////////////
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

	// Calculate total and keep updated
	$: total = $cartStore?.items.reduce((sum: any, item: any) => sum + 30000 * item.rentTime, 0);

	// Keep inventory updated inventory
	$: inventory = Object.values($stationStore.inventory) as ItemInterface[];

	onMount(async () => {
		// initialize reservationsAuthStore with a unique auth-token
		// Get station inventory from DB
		const unsub = onSnapshot(doc(db, 'station', $stationStore.id as string), (doc) => {
			const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
			const _inventory: InventoryInterface = doc.data()?.inventory;
			$stationStore.inventory = _inventory;
			loaded = true;
		});

		handleReservations();
	});
</script>

{#if loaded}
	<FlexBox intent="flexColLeft" class="w-full mt-[80px]">
		<FlexBox intent="flexRowLeft" gap="small" py="medium" class="relative">
			<BackButton />
			<Text intent="p1">Vovler</Text>
		</FlexBox>
		<FlexBox intent="flexColLeft" gap="medium" py="small" class="w-full min-h-screen">
			<FlexBox intent="flexColCenter" gap="small" class="w-full">
				{#each sortObjectsById(inventory) as item}
					<FlexBox
						intent="flexRowLeft"
						gap="xsmall"
						px="xsmall"
						py="small"
						class="w-full rounded-lg bg-surface-light/20">
						<div
							class={classNames(
								'image',
								item.state !== 'available' && 'grayscale opacity-40'
							)}
							style="background-image: url(/images/paddle-transparent-512.png)" />
						<Grid intent="cols-4" class="w-full">
							<FlexBox intent="flexRowLeft" class="">
								<Text
									intent="h6"
									class={classNames(
										item.state !== 'available' && 'text-status-disabled'
									)}>
									{item.name}
								</Text>
							</FlexBox>
							<FlexBox intent="flexColCenter" class="max-w-[50%] mx-auto">
								{#if item.state === 'available'}
									<Text intent="p2" variant="success" class="text-center">
										Disponible
									</Text>
								{/if}
								{#if item.state === 'reserved'}
									<Text intent="p2" variant="error" class="text-center">
										Reservado
									</Text>
									<Text intent="p2" variant="error" class="text-center">
										{getCurrentTime(
											$reservationTimersStore.find(
												(timer) => timer.id === item.id
											)?.currentTime ?? 0
										)}
									</Text>
								{/if}
								{#if item.state === 'unavailable'}
									<Text intent="p2" variant="error" class="text-center">
										No disponible
									</Text>
								{/if}
							</FlexBox>
							<FlexBox intent="flexRowCenter" gap="xsmall" class="">
								<Button
									intent="text"
									class={classNames(
										item.state !== 'available' && 'text-status-disabled'
									)}
									onClick={() => {
										removeTimeFromItem(item);
										handleReservations();
									}}>
									<Icon icon="mdi:minus" />
								</Button>
								<Text
									intent="p1"
									class={classNames(
										item.state !== 'available' && 'text-status-disabled'
									)}>
									{item.rentTime}
								</Text>
								<Button
									intent="text"
									class={classNames(
										item.state !== 'available' && 'text-status-disabled'
									)}
									onClick={() => addTimeToItem(item)}>
									<Icon icon="mdi:plus" />
								</Button>
							</FlexBox>
							<FlexBox intent="flexRowRight" class="pr-[8px]">
								<Button
									intent="text"
									disabled={item.state !== 'available' ? true : false}
									onClick={() => {
										addToCart(item);
										handleReservations();
										socket.createReservation(wavvySocket, item);
										$notificationStore.open = true;
										$notificationStore.title = 'Reserva exitosa!';
										$notificationStore.content =
											'Hemos reservado tu paddle por 5 minutos.';
										$notificationStore.type = 'success';
									}}>
									Agregar
								</Button>
							</FlexBox>
						</Grid>
					</FlexBox>
				{/each}
			</FlexBox>
			<div class="w-full bg-surface-light/20 px-[16px] py-[16px] rounded-md">
				{#each $cartStore?.items as item}
					{#if item.rentTime}
						<Grid intent="cols-4" class="w-full py-[8px]">
							<FlexBox intent="flexRowLeft" class="w-full">
								<Text class="font-bold">{item.name}</Text>
							</FlexBox>
							<FlexBox intent="flexRowCenter" class="w-full">
								<Text>{item.rentTime} Hrs</Text>
							</FlexBox>
							<FlexBox intent="flexRowCenter" class="w-full">
								<Text>${30000 * item.rentTime}</Text>
							</FlexBox>
							<FlexBox intent="flexRowRight" class="w-full">
								<Button
									intent="text"
									class="text-[20px]"
									onClick={() => {
										removeFromCart(item);
										handleReservations();
										socket.cancelReservation(wavvySocket, item);
									}}>
									<Icon icon="mdi:trash-can-outline" class="-translate-y-[1px]" />
								</Button>
							</FlexBox>
						</Grid>
					{/if}
				{/each}
				{#if $cartStore?.items.length === 0}
					<FlexBox intent="flexRowCenter" class="w-full py-[8px]">
						<Text class="">No hay paddles en tu orden.</Text>
					</FlexBox>
				{/if}
				<FlexBox intent="flexRowRight" class="w-full mt-[24px]">
					<Text intent="h5">Total: $ {total}</Text>
				</FlexBox>
			</div>
			<!-- <Button fullWidth intent="primary" class="w-full mt-[16px]">Alquilar</Button> -->
			<PayU label="Pagar" />
		</FlexBox>
	</FlexBox>
{:else}
	<FlexBox intent="flexColCenter" gap="medium" class="w-full min-h-screen">
		<Spinner />
	</FlexBox>
{/if}

<style>
	.image {
		height: 60px;
		width: 30px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
