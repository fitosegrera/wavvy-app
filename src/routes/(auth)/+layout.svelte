<script lang="ts">
	import { BaseLayout } from '$lib/components';
	import { pushNotificationsPermission } from '$lib/store/permissions';
	import { onMount } from 'svelte';
	import { PUBLIC_SOCKET_SERVER_URL, PUBLIC_VAPID_KEY } from '$env/static/public';
	import { urlBase64ToUint8Array } from '$lib/utils/urlBase64ToUint8Array';
	import { serviceWorkerRegistration } from '$lib/store/sw';
	import { registerServiceWorker } from '$lib/utils/serviceWorker';
	import { sendPushNotification } from '$lib/utils/sendPushNotification';
	let subscribed = false;

	onMount(async () => {
		// get current notification permission status
		$pushNotificationsPermission = window.Notification.permission;

		if (!$pushNotificationsPermission) return;

		// check if the service worker is registered, if not, register it
		if (!$serviceWorkerRegistration) await registerServiceWorker();

		try {
			// set the push subscription
			$serviceWorkerRegistration &&
				$serviceWorkerRegistration.pushManager
					.subscribe({
						userVisibleOnly: true,
						applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
					})
					.then((subscription) => {
						console.log('User is subscribed', subscription);
						subscribed = true;
						sendPushNotification(
							'subscribe',
							subscription,
							JSON.stringify({
								title: 'Se acabó el tiempo!',
								body: 'Por favor, sigue las instrucciones en la APP para devolver tu paddle a la estación.',
								id: 'p1',
								rentTime: 10,
								icon: `${PUBLIC_SOCKET_SERVER_URL}icons/icon-192-192.png`
							})
						);
					})
					.catch((error) => {
						console.error(error);
					});
		} catch (error) {
			console.error(error);
		}
	});
</script>

<svelte:head>
	<title>Wavvy | Auth</title>
</svelte:head>

<BaseLayout>
	<slot />
</BaseLayout>
