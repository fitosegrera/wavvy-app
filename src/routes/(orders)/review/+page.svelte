<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { BackButton, Button, FlexBox, Grid, Text } from '$lib/components';
	import { stationStore } from '$lib/store/orders/station';
	import type { ItemInterface } from '$lib/types/orders';
	import { newOrder } from '$lib/utils/orders';
	import { getReservationTimer } from '$lib/utils/reservations';
	import { onMount } from 'svelte';

	let timeLeftInterval: NodeJS.Timeout | null = null;
	let timeLeft = 0;
	let selectedItem = {} as ItemInterface;
	let stationId: string;
	let key: string;

	onMount(() => {
		const url = $page.url;
		const itemData = url.searchParams.get('selectedItem') as string;
		key = url.searchParams.get('key') as string;
		stationId = url.searchParams.get('stationId') as string;
		// parse the item data
		selectedItem = JSON.parse(itemData);
		timeLeftInterval = getReservationTimer(stationId, key, selectedItem, (tl: number) => {
			timeLeft = tl;
		}) as NodeJS.Timeout;
	});
</script>

<FlexBox intent="flexColTop" py="medium" gap="medium" class="w-full h-full">
	<FlexBox intent="flexRowLeft" gap="small" class="w-full">
		<BackButton
			href="/time"
			onBack={() => {
				// // reset the scanner result
				// $result = null;
				// //Clear timer
				// if (timeLeftInterval) {
				// 	clearInterval(timeLeftInterval);
				// }
				// // cancel reservation and update inventory DB
				// $stationStore.inventory[key].state = 'available';
				// $stationStore.inventory[key].reservation = null;
				// console.log('XXXXX', stationId);
				// updateStationInventoryDb(stationId, $stationStore.inventory);
			}} />
		<Text>Volver</Text>
	</FlexBox>
	<FlexBox intent="flexColCenter" gap="medium" class="w-full ">
		<Text intent="h3">Revisa tu orden</Text>
		<Text intent="p1">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
		</Text>
		<Grid intent="cols-4" class="items-center w-full my-[48px]">
			<div class="image" style="background-image: url(/images/paddle-transparent-512.png)" />
			<Text intent="p1">{selectedItem.name}</Text>
			<Text intent="p1">{selectedItem.rentTime + 'hrs'}</Text>
			{#if selectedItem.rentTime}
				<Text intent="p1">
					{`$${$stationStore.marketing.hourlyRate * selectedItem.rentTime}`}
				</Text>
			{/if}
		</Grid>
		<Text intent="p1" variant="error" class="text-center">
			{`Tu reserva expira en ${timeLeft} segundos.`}
		</Text>
		<Button
			onClick={() => {
				newOrder(stationId, selectedItem);
				timeLeftInterval && clearInterval(timeLeftInterval);
				goto('/payment-confirmation');
			}}>
			Pagar
		</Button>
	</FlexBox>
</FlexBox>

<style>
	.image {
		height: 48px;
		width: 24px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
