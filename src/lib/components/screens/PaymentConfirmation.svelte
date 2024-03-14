<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, FlexBox, Spinner, Text } from '$lib/components';
	import { stationStore } from '$lib/store/orders/station';
	import type { ItemInterface, OrderInterface } from '$lib/types/orders';
	import { updateOrdersDb } from '$lib/utils/firestore';
	import { getReservationTimer } from '$lib/utils/reservations';
	import { Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let loading = true;
	let timeLeftInterval: NodeJS.Timeout;
	let selectedItem = {} as ItemInterface;
	let key = '';
	let stationId = '';

	onMount(() => {
		const url = $page.url;
		const itemData = url.searchParams.get('selectedItem') as string;
		key = url.searchParams.get('key') as string;
		stationId = url.searchParams.get('stationId') as string;
		// parse the item data
		selectedItem = JSON.parse(itemData);

		const total =
			selectedItem?.rentTime &&
			(($stationStore.marketing.hourlyRate * selectedItem?.rentTime) as number);

		setTimeout(() => {
			loading = false;

			const newOrder: OrderInterface = {
				uid: selectedItem?.currentOrder?.uid as string,
				oid: selectedItem?.currentOrder?.oid as string,
				duration: selectedItem?.rentTime as number,
				startTime: Timestamp.now(),
				total: total
			};

			updateOrdersDb(newOrder);
		}, 2000);

		timeLeftInterval = getReservationTimer(
			stationId,
			key,
			selectedItem,
			(tl: number) => {}
		) as NodeJS.Timeout;
	});
</script>

<FlexBox intent="flexColCenter" gap="medium" class="w-full h-full">
	{#if loading}
		<Spinner />
	{:else}
		<Text intent="h5">Confirmación de pago</Text>
		<Text class="text-center">Gracias por tu pago, haz clic en continuar para iniciar.</Text>
		<Button
			onClick={() => {
				clearInterval(timeLeftInterval);
				goto('/instructions');
			}}>
			Continuar
		</Button>
	{/if}
</FlexBox>
