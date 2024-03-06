<script lang="ts">
	import { FlexBox, Text } from '$lib/components';
	import { networkNotificationStore } from '$lib/store/overlays/networkNotification';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	onMount(() => {});
</script>

<FlexBox
	intent="flexColCenter"
	class="absolute flex items-center justify-center z-[9999] top-[0px] left-[50%] -translate-x-[50%] min-w-[100%]"
>
	<div
		class="flex items-center justify-center w-full h-full bg-status-error/50 px-[24px] py-[12px] shadow-sm pointer-events-auto"
		transition:fly={{
			y: -200,
			duration: 200
		}}
	>
		<Text intent="p2" class="text-status-error-light">{$networkNotificationStore.content}</Text>
	</div>
</FlexBox>
