<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FlexBox, ProgressCircular, Text } from '$lib/components';
	import { user } from '$lib/store/auth';
	import { stationStore } from '$lib/store/orders/station';
	import { realtimeInventory, stationId } from '$lib/store/realtimeDb';
	import { updateStationInventoryDb } from '$lib/utils/firestore';
	import { getOrderItemByUid } from '$lib/utils/orders';
	import { onMount } from 'svelte';

	const uid: string = $user?.uid as string;
	const sid: string = $stationId as string;
	let timeLeft = 0;

	onMount(() => {
		setInterval(() => {
			timeLeft += 1;
		}, 1000);
	});
</script>

<FlexBox intent="flexColTop" py="large" gap="large" class="w-full h-full">
	<Text intent="h5">Mi Sesión</Text>
	<div class="w-[240px] h-[240px]">
		<ProgressCircular max={100} value={timeLeft} />
	</div>
	<Text intent="p1" variant="dim">Para terminar tu sesión, utiliza el siguiente botón.</Text>
	<Button
		intent="primary"
		onClick={() => {
			const item = getOrderItemByUid(uid, $realtimeInventory);
			console.log(item, uid, sid);
			if (item) {
				$stationStore.inventory[item?.id].currentOrder = null;
				$stationStore.inventory[item?.id].state = 'available';
				$stationStore.inventory[item?.id].reservation = null;
				$stationStore.inventory[item?.id].rentTime = 1;
				updateStationInventoryDb(sid, $stationStore.inventory);
			}
			goto('/');
		}}>
		Terminar
	</Button>
</FlexBox>
