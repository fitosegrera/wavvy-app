<script lang="ts">
	import { goto } from '$app/navigation';

	// import { goto } from '$app/navigation';
	import { BackButton, Button, FlexBox, Text } from '$lib/components';
	import { user } from '$lib/store/auth';
	import { realtimeInventory } from '$lib/store/realtimeDb';
	import socket from '$lib/store/socket';
	import { getOrderItemByUid } from '$lib/utils/orders';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	const uid: string = $user?.uid as string;
	let response: string = '';
	let socketTimer: NodeJS.Timeout;
	let loading = false;
	const item = getOrderItemByUid(uid, $realtimeInventory);

	interface SocketMessageInterface {
		from: string | null;
		to: string | null;
		id: string | null;
		action: string | null;
	}

	let dataToSend: SocketMessageInterface = {
		from: 'app',
		to: 'server',
		id: 'p' + item?.id,
		action: null
	};

	onMount(() => {
		socket.subscribe((currentMessage) => {
			response = currentMessage;
			console.log('response', response);
			const resObject = JSON.parse(response);
			if (resObject.action === 'unlocked') {
				clearInterval(socketTimer);
				loading = false;
				dataToSend.action = 'ride';
				socket.sendMessage(JSON.stringify(dataToSend));
				goto('/ride');
			}
		});
	});
</script>

<FlexBox intent="flexColTop" gap="medium" class="w-full h-full">
	<FlexBox intent="flexRowLeft" gap="small" class="w-full">
		<BackButton />
		<Text>Volver</Text>
	</FlexBox>
	<Text intent="h5">Desbloquea tu paddle</Text>
	<Text intent="p1" variant="dim">Haz clic en desbloquar para iniciar a usar tu paddle.</Text>
	<Button
		intent="primary"
		onClick={() => {
			loading = true;
			dataToSend = { from: 'app', to: 'server', id: 'p' + item?.id, action: 'unlock' };
			socketTimer = setInterval(() => {
				socket.sendMessage(JSON.stringify(dataToSend));
			}, 3000);
		}}>
		{#if loading}
			<Icon icon="svg-spinners:180-ring" />
		{:else}
			Desbloquear
		{/if}
	</Button>
</FlexBox>
