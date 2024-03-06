<script lang="ts">
	import { goto } from '$app/navigation';
	import { BackButton, FlexBox, Text } from '$lib/components';
	import { user } from '$lib/store/auth';
	import { isOnline } from '$lib/store/network';
	import { selectedItemStore } from '$lib/store/orders/item';
	import { stationStore } from '$lib/store/orders/station';
	import { reservationDurationStore } from '$lib/store/orders/timers';
	import { realtimeInventory } from '$lib/store/realtimeDb';
	import { error, result, status, stream } from '$lib/store/widgets/scanner';
	import type {
		InventoryKey,
		ItemInterface,
		ItemState,
		ReservationInterface
	} from '$lib/types/orders';
	import { updateStationInventoryDb } from '$lib/utils/firestore';
	import { generateId } from '$lib/utils/generateId';
	import { Timestamp } from 'firebase/firestore';
	import jsQR from 'jsqr';
	import { createEventDispatcher, onMount } from 'svelte';
	import ScannerBorders from './ScannerBorders.svelte';
	import UserMedia from './useUserMedia.svelte';

	$result = null;
	export let stopMediaStream: () => void | null = () => null;
	let startMediaStream: () => void | null = () => null;

	const dispatch = createEventDispatcher();

	$: active = !$result;

	let video: HTMLVideoElement | null = null;
	let canvas: HTMLCanvasElement | null = null;
	let overlay: HTMLDivElement | null = null;
	let useUserMedia: any;
	let mounted;

	onMount(() => {
		mounted = true;

		({ stopMediaStream, startMediaStream } = useUserMedia());

		return () => {
			// console.log('Component destroyed');
			stopMediaStream();
			if (video) video.srcObject = null;
		};
	});

	const startCapturing = (): void => {
		if (!canvas || !video) return;

		const context = canvas.getContext('2d');

		if (!context) return;

		const { width, height } = canvas;

		context.drawImage(video, 0, 0, width, height);

		const imageData = context.getImageData(0, 0, width, height);
		const qrCode = jsQR(imageData.data, width, height);

		if (qrCode === null) {
			// Set capturing timeout
			setTimeout(startCapturing, 750);
		} else {
			// If the QR code has data
			if (qrCode.data) {
				// Set result store
				$result = qrCode.data as string | null;

				// Get the item id from the QR code
				const itemId = qrCode.data.split('%')[3] as string;
				// Get the station id from the QR code
				const stationId = qrCode.data.split('%')[1] as string;
				// Set the item id as a key
				const key = itemId as InventoryKey;

				console.log('QR Code: ', qrCode.data);

				let selectedItem = {
					id: 0,
					name: '',
					state: 'available',
					reservation: null
				} as ItemInterface;

				$realtimeInventory.forEach((item, index) => {
					// If the item has NO a reservation
					if (
						item.reservation === null &&
						item.id.toString() === itemId &&
						item.state === 'available'
					) {
						// generate a random id for the reservation
						const rid = generateId(16);

						// declare a new reservation
						const newReservation: ReservationInterface = {
							rid: rid,
							uid: $user?.uid as string,
							duration: $reservationDurationStore,
							startTime: Timestamp.now()
						};

						// set item state to reserved
						$stationStore.inventory[key].state = 'reserved' as ItemState;

						// set selectedItem
						selectedItem.state = 'reserved';
						selectedItem.name = item.name;
						selectedItem.id = item.id;
						selectedItem.rentTime = item.rentTime;
						selectedItem.reservation = newReservation;

						// set item reservation
						$stationStore.inventory[key].reservation =
							newReservation as ReservationInterface;

						// update inventory DB
						updateStationInventoryDb(stationId, $stationStore.inventory);
					} else {
						$selectedItemStore = $realtimeInventory[
							parseInt(itemId) - 1
						] as ItemInterface;
					}

					if (index === $realtimeInventory.length - 1) {
						// go to time selection screen
						console.log('Selected item: ', selectedItem);
						goto('/time?selectedItem=' + JSON.stringify(selectedItem));
					}
				});

				dispatch('successfulScan', qrCode.data);

				stopMediaStream();
				video.srcObject = null;
			}
		}
	};

	const handleCanPlay = (): void => {
		// console.log('canplay');
		if (canvas === null || canvas === null || video === null || video === null) {
			return;
		}

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		if ($error !== null) {
			// TODO: show dialog to user with an error
		} else {
			startCapturing();
		}
	};

	$: if ($status === 'resolved' && video !== null && $stream) {
		// console.log('Resolve, stream');
		video.srcObject = $stream;
		video.play().catch(console.error);
	}

	$: if (active && $status === 'stopped' && startMediaStream) {
		startMediaStream();
	}
</script>

<UserMedia bind:useUserMedia />

<FlexBox intent="flexColTop" gap="large" class="w-full h-full">
	<FlexBox intent="flexRowLeft" gap="small" class="w-full">
		<BackButton href="/" />
		<Text>Volver</Text>
	</FlexBox>
	{#if !$result}
		<div class={`scanner ${active ? '' : 'scanner--hidden'}`}>
			<div class="scanner__aspect-ratio-container">
				{#if $isOnline}
					<canvas bind:this={canvas} class="scanner__canvas" />
					<!-- svelte-ignore a11y-media-has-caption -->
					<video bind:this={video} on:canplay={handleCanPlay} class="scanner__video">
						<!-- <track kind="captions" /> -->
					</video>
				{:else}
					<!-- svelte-ignore a11y-media-has-caption -->
					<video bind:this={video} class="scanner__video grayscale">
						<!-- <track kind="captions" /> -->
					</video>
					<div bind:this={overlay} class="bg-white scanner_video" />
				{/if}
				<ScannerBorders />
			</div>
		</div>
		<Text intent="h5" class="text-center ">
			Escanea el codigo del paddle que deseas alquilar.
		</Text>
	{/if}
</FlexBox>

<style>
	.scanner {
		width: 100%;
		max-width: 500px;
	}

	.scanner--hidden {
		display: none;
	}

	.scanner__aspect-ratio-container {
		position: relative;

		overflow: hidden;

		padding-bottom: 100%;

		border-radius: 10%;
	}

	.scanner__video {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		border-radius: inherit;

		outline: none;
		object-fit: cover;
	}

	.scanner__canvas {
		display: none;
	}

	.scanner-tip {
		display: flex;
		justify-content: center;

		margin-top: 15px;

		font-size: 0.8rem;
	}
</style>
