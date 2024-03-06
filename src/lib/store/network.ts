import { browser } from '$app/environment';
import type { NotificationPropsInterface } from '$lib/types/components';
import { writable } from 'svelte/store';
import { networkNotificationStore } from './overlays/networkNotification';

export const networkState = writable<string>('online');
export const isOnline = writable<boolean>(true);

browser &&
	window.addEventListener('online', () => {
		console.log('Became online');
		networkState.set('online');
		isOnline.set(true);

		const data: NotificationPropsInterface = {
			open: false,
			content: '',
			type: 'info'
		};

		networkNotificationStore.set(data);
	});

browser &&
	window.addEventListener('offline', () => {
		console.log('Became offline');
		networkState.set('offline');
		isOnline.set(false);

		const data: NotificationPropsInterface = {
			open: true,
			content: 'Sin internet. Revisa tu conexión y vuelve a intentarlo.',
			type: 'info'
		};

		networkNotificationStore.set(data);
	});
