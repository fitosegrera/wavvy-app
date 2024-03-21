<script lang="ts">
	import { BottomBar, FlexBox, Header, ModalBasic, NotificationBasic } from '$lib/components';
	import { modalStore } from '$lib/store/overlays/modal';
	import { notificationStore } from '$lib/store/overlays/notification';
	import { classNames } from '$lib/utils/classNames';
</script>

<FlexBox
	intent="flexColTop"
	class={classNames(
		'mobile-width',
		'min-h-screen mx-auto p-[24px]',
		'bg-surface',
		'overflow-y-auto',
		'overflow-x-hidden',
		'relative',
		'mb-[80px]'
	)}>
	{#if $modalStore?.open}
		<ModalBasic />
	{/if}
	{#if $notificationStore?.open}
		<NotificationBasic />
	{/if}
	<FlexBox intent="flexRowCenter" py="xsmall" class="z-[200] w-full pointer-events-none">
		<Header />
	</FlexBox>
	<main class="w-full h-full z-[110]">
		<slot />
	</main>
	<BottomBar />
</FlexBox>
