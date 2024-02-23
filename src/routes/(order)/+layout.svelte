<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { BaseLayout } from '$lib/components';
	import { db } from '$lib/firebase';
	import { stationStore } from '$lib/stores/station';
	import type { InventoryInterface, MarketingInterface } from '$types/station';
	import { doc, onSnapshot } from 'firebase/firestore';
	import { onMount } from 'svelte';

	$stationStore.id = 'carey-beach';
	$stationStore.name = 'Carey Beach';
	$stationStore.loaded = false;

	onMount(async () => {
		// initialize reservationsAuthStore with a unique auth-token
		// Get station inventory from DB
		onSnapshot(doc(db, 'station', $stationStore.id as string), (doc) => {
			const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
			const _inventory: InventoryInterface = doc.data()?.inventory;
			const _marketing: MarketingInterface = doc.data()?.marketing;

			$stationStore.inventory = _inventory;
			$stationStore.loaded = true;
			$stationStore.marketing = _marketing;
		});
	});
</script>

<svelte:head>
	<title>Wavvy App</title>
</svelte:head>

<BaseLayout>
	<slot />
</BaseLayout>
