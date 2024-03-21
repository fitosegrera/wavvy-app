<script lang="ts">
	import {
		FlexBox,
		Header,
		LegalScreenOverlay,
		ModalBasic,
		NotificationBasic,
		NotificationNetwork,
		NotificationsPermissionRequest,
		OfflineScreenOverlay
	} from '$lib/components';
	import { isOnline } from '$lib/store/network';
	import { legalScreenStore } from '$lib/store/overlays/legal';
	import { modalStore } from '$lib/store/overlays/modal';
	import { networkNotificationStore } from '$lib/store/overlays/networkNotification';
	import { notificationStore } from '$lib/store/overlays/notification';
	import { classNames } from '$lib/utils/classNames';
	import { pushNotificationsPermission } from '$lib/store/permissions';
</script>

<FlexBox
	intent="flexColCenter"
	class={classNames(
		'mobile-width',
		'min-h-screen mx-auto p-[24px]',
		'bg-surface',
		'overflow-y-auto',
		'overflow-x-hidden',
		'relative'
	)}>
	{#if !$isOnline}
		<OfflineScreenOverlay />
	{/if}
	{#if $pushNotificationsPermission !== 'granted'}
		<NotificationsPermissionRequest status={$pushNotificationsPermission} />
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

	<FlexBox intent="flexRowCenter" py="xsmall" class="z-[200] w-full pointer-events-none">
		<Header />
	</FlexBox>

	<main class="w-full h-full">
		<slot />
	</main>
</FlexBox>
