<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import type { PushPermissionTypes } from '$lib/types/permissions';
	import { requestNotificationPermission } from '$lib/utils/requestNotificationPermission';
	import { serviceWorkerRegistration } from '$lib/store/sw';
	import { pushNotificationsPermission } from '$lib/store/permissions';

	interface NotificationsPermissionScreenProps {
		status: PushPermissionTypes;
	}

	export let status: NotificationsPermissionScreenProps['status'] = 'default';

	console.log('status', status);
</script>

<FlexBox
	intent="flexColCenter"
	px="large"
	gap="small"
	class="fixed top-0 left-0 z-[500] flex items-center justify-center w-full h-full bg-black/70 backdrop-blur-sm">
	{#if status === 'default'}
		<Text variant="inverted" intent="h5" class="text-center">Permisos de Notificaciones</Text>
		<Text variant="inverted" class="text-center">
			Necesitamos que nos des permiso para enviarte notificaciones.
		</Text>
		<Button
			intent="primary"
			size="large"
			onClick={async () => {
				console.log('Requesting permission...');
				if ($serviceWorkerRegistration && $serviceWorkerRegistration.active) {
					$pushNotificationsPermission = await requestNotificationPermission();
				}
			}}>
			Permitir
		</Button>
	{/if}
	{#if status === 'denied'}
		<Text variant="inverted" intent="h5" class="text-center">Permisos de Notificaciones</Text>
		<Text variant="inverted" class="text-center">
			Tus notificaciones han sido bloqueadas. Por favor, habilita las notificaciones en tu
			navegador.
		</Text>
		<Text variant="inverted" class="font-bold text-center">Instrucciones:</Text>
	{/if}
</FlexBox>
