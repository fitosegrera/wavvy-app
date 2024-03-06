<script lang="ts">
	import { FlexBox, Text } from '$lib/components';
	import { closeNotification, notificationStore } from '$lib/store/overlays/notification';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	onMount(() => {
		setTimeout(() => {
			closeNotification();
		}, 3000);
	});
</script>

<FlexBox
	intent="flexColLeft"
	class="absolute flex items-center justify-center z-[9999] top-[84px] left-[50%] rounded-md -translate-x-[50%] min-w-[100%]"
>
	<div
		class="w-full h-full bg-surface px-[24px] py-[12px] rounded-md max-w-[75%] shadow-xl pointer-events-auto"
		transition:fly={{
			x: 400,
			duration: 200
		}}
	>
		<Text intent="p1" class="font-bold">{$notificationStore.title}</Text>
		<Text intent="p2" class="">{$notificationStore.content}</Text>
	</div>
</FlexBox>
