<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { BackButton, Button, FlexBox, Text } from '$lib/components';
	import { user } from '$lib/store/auth';
	import { stationStore } from '$lib/store/orders/station';
	import { result } from '$lib/store/widgets/scanner';
	import type { InventoryKey, ItemInterface } from '$lib/types/orders';
	import { updateStationInventoryDb } from '$lib/utils/firestore';
	import { getReservationTimer } from '$lib/utils/reservations';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	$: key = '' as InventoryKey;
	$: reservedBySelf = false;
	$: timeLeft = 0;
	$: selectedItem = {} as ItemInterface;
	let timeLeftInterval: NodeJS.Timeout | null = null;
	let stationId: string;

	onMount(() => {
		if ($result) {
			stationId = $result.split('%')[1] as string;
			const itemId = $result.split('%')[3] as string;
			key = itemId as InventoryKey;
			// get the selected item from url parameter
			const url = $page.url;
			const itemData = url.searchParams.get('selectedItem') as string;
			// parse the item data
			selectedItem = JSON.parse(itemData);
			// Set initial rentTime
			selectedItem.rentTime = 1;
			// console.log('TIME SCREEN selectedItem', selectedItem);
			timeLeft = selectedItem.reservation?.duration as number;
			// Update stationStore inventory
			$stationStore.inventory[key] = selectedItem;

			if (selectedItem?.reservation?.uid === $user?.uid) {
				reservedBySelf = true;
				console.log('Reserved by self');
			} else {
				reservedBySelf = false;
				console.log('Reserved by someone else');
			}

			timeLeftInterval = getReservationTimer(stationId, key, selectedItem, (tl: number) => {
				timeLeft = tl;
			}) as NodeJS.Timeout;
		}
	});
</script>

<FlexBox intent="flexColTop" py="medium" gap="medium" class="w-full h-full">
	<FlexBox intent="flexRowLeft" gap="small" class="w-full">
		<BackButton
			href="/scan"
			onBack={() => {
				// reset the scanner result
				$result = null;

				//Clear timer
				if (timeLeftInterval) {
					clearInterval(timeLeftInterval);
				}

				// cancel reservation and update inventory DB
				$stationStore.inventory[key].state = 'available';
				$stationStore.inventory[key].reservation = null;

				console.log('XXXXX', stationId);
				updateStationInventoryDb(stationId, $stationStore.inventory);
			}} />
		<Text>Volver</Text>
	</FlexBox>

	<FlexBox intent="flexColCenter">
		<!-- <Text intent="p1">Reservaste a</Text> -->
		<Text intent="h3">{selectedItem.name}</Text>
	</FlexBox>
	<div class="image" style="background-image: url(/images/paddle-transparent-512.png)" />
	{#if reservedBySelf}
		<FlexBox intent="flexColCenter" class="">
			<Text intent="p1">Cuantas horas deseas usarlo?</Text>
		</FlexBox>
		<FlexBox intent="flexRowCenter" gap="xsmall" class="">
			<Button
				intent="text"
				class="text-4xl"
				onClick={() => {
					if (selectedItem.rentTime) {
						if (selectedItem.rentTime !== 1) {
							selectedItem.rentTime--;
						} else {
							selectedItem.rentTime = 1;
						}
					}
				}}>
				<Icon icon="mdi:minus" />
			</Button>
			<Text intent="h2">
				{selectedItem.rentTime}
			</Text>
			<Button
				intent="text"
				class="text-4xl"
				onClick={() => {
					if (selectedItem.rentTime) {
						if (selectedItem.rentTime !== 4) {
							selectedItem.rentTime++;
						} else {
							selectedItem.rentTime = 4;
						}
					}
				}}>
				<Icon icon="mdi:plus" />
			</Button>
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="medium">
			<Button
				intent="primary"
				onClick={() => {
					// update the inventory
					$stationStore.inventory[key] = selectedItem;
					// clear the timer
					timeLeftInterval && clearInterval(timeLeftInterval);
					// update the inventory in the DB
					updateStationInventoryDb(stationId, $stationStore.inventory);
					// go to the review page
					goto(
						`/review?key=${key}&stationId=${stationId}&selectedItem=${JSON.stringify(selectedItem)}`
					);
				}}>
				Siguiente
			</Button>
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="small">
			<Text intent="p1" class="text-center">
				Completa el proceso de alquiler antes de que tu reserva termine.
			</Text>
			<Text intent="p1" variant="error" class="text-center">
				{`Tu reserva expira en ${timeLeft} segundos.`}
			</Text>
		</FlexBox>
	{:else}
		<FlexBox intent="flexColCenter" gap="medium">
			<Text intent="h3">Paddle reservado</Text>
			<Text intent="p1" class="text-center">
				El paddle que escaneaste está reservado por otra persona y es posible que el usuario
				no lo alquile.
			</Text>
			<Text intent="p1" variant="error" class="text-center">
				Vuelve a intentarlo en en unos minutos.
			</Text>
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="medium">
			<Button
				intent="primary"
				onClick={() => {
					goto('/');
				}}>
				Entendido
			</Button>
		</FlexBox>
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
