<script lang="ts">
	import {
		FlexBox,
		LegalScreenOverlay,
		ModalBasic,
		NotificationBasic,
		NotificationNetwork,
		OfflineScreenOverlay
	} from '$lib/components';
	import { isOnline } from '$lib/store/network';
	import { legalScreenStore } from '$lib/store/overlays/legal';
	import { modalStore } from '$lib/store/overlays/modal';
	import { networkNotificationStore } from '$lib/store/overlays/networkNotification';
	import { notificationStore } from '$lib/store/overlays/notification';
	import { classNames } from '$lib/utils/classNames';
</script>

<FlexBox
	intent="flexColCenter"
	class={classNames(
		'mobile-width',
		'h-screen mx-auto p-[24px]',
		'bg-gradient-to-b from-surface to-surface-dark/80',
		'overflow-y-auto'
	)}>
	{#if !$isOnline}
		<OfflineScreenOverlay />
	{/if}
	{#if $modalStore?.open}
		<ModalBasic />
	{/if}
	{#if $legalScreenStore?.open}
		<LegalScreenOverlay />
	{/if}
	{#if $notificationStore?.open}
		<NotificationBasic />
	{/if}
	{#if $networkNotificationStore?.open}
		<NotificationNetwork />
	{/if}
	<main class="w-full h-full">
		<slot />
	</main>
</FlexBox>
