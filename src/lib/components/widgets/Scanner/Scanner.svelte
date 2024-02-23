<script lang="ts">
	import { BackButton, FlexBox, Text } from '$lib/components';
	import { user } from '$lib/stores/auth';
	import { notificationStore } from '$lib/stores/notification';
	import { cartStore } from '$lib/stores/orders';
	import { error, result, status, stream } from '$lib/stores/scanner';
	import { createEventDispatcher, onMount } from 'svelte';

	import jsQR from 'jsqr';

	import ScannerBorders from './ScannerBorders.svelte';

	import { goto } from '$app/navigation';
	import { selectedItemStore } from '$lib/stores/orders';
	import { stationStore } from '$lib/stores/station';
	import { updateStationInventoryDb } from '$lib/utils/firestoreUtils';
	import type { ItemInterface, ItemState } from '$types/station';
	import UserMedia from './useUserMedia.svelte';

	$result = null;
	export let stopMediaStream: () => void | null = () => null;
	let startMediaStream: () => void | null = () => null;

	const dispatch = createEventDispatcher();

	$: active = !$result;

	let video: HTMLVideoElement | null = null;
	let canvas: HTMLCanvasElement | null = null;
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
			// console.log('timeout');
			setTimeout(startCapturing, 750);
		} else {
			$result = qrCode.data as string | null;
			if (qrCode.data) {
				const itemId = qrCode.data.split('%')[3] as string;

				const key = ('p' + itemId) as keyof typeof $stationStore.inventory;

				$stationStore.inventory[key].state = 'reserved' as ItemState;
				$stationStore.inventory[key].reservation.user = $user?.user?.uid! as string;

				$selectedItemStore = $stationStore.inventory[key] as ItemInterface;

				updateStationInventoryDb($stationStore.id as string, $stationStore.inventory);

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
				<canvas bind:this={canvas} class="scanner__canvas" />
				<!-- svelte-ignore a11y-media-has-caption -->
				<video bind:this={video} on:canplay={handleCanPlay} class="scanner__video">
					<!-- <track kind="captions" /> -->
				</video>
				<ScannerBorders />
			</div>
		</div>
		<Text intent="h5" class="text-center ">
			Escanea el codigo del paddle que deseas alquilar.
		</Text>
	{:else}
		{() => {
			if (!$cartStore.items.includes($selectedItemStore)) {
				goto('/time');
			} else {
				const newNotification = {
					open: true,
					message: 'Ya tienes este producto en tu orden',
					type: 'error'
				};
				$notificationStore = newNotification;
			}
		}}
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
