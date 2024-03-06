<script lang="ts">
	import { BottomBar, FlexBox, ModalBasic, NotificationBasic, Topbar } from '$lib/components';
	import { modalStore } from '$lib/store/overlays/modal';
	import { notificationStore } from '$lib/store/overlays/notification';
	import { classNames } from '$lib/utils/classNames';
</script>

<FlexBox
	intent="flexColTop"
	class={classNames(
		'mobile-width',
		'h-screen mx-auto p-[24px]',
		'bg-gradient-to-b from-surface to-surface-dark/80',
		'overflow-y-auto'
	)}>
	{#if $modalStore?.open}
		<ModalBasic />
	{/if}
	{#if $notificationStore?.open}
		<NotificationBasic />
	{/if}
	<FlexBox intent="flexColTop" class="fixed top-0 left-0 z-50 w-full h-full pointer-events-none">
		<Topbar />
	</FlexBox>
	<main class="w-full h-full mt-[56px]">
		<slot />
	</main>
	<BottomBar />
</FlexBox>
