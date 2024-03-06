import type { NotificationPropsInterface } from '$lib/types/components';
import { writable } from 'svelte/store';

const data: NotificationPropsInterface = {
	open: false,
	content: 'Description goes here',
	type: 'info'
};

const networkNotificationStore = writable(data);

export { networkNotificationStore };
