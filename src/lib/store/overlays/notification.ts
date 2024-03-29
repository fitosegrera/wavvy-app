import type { NotificationPropsInterface } from '$lib/types/components';
import { writable } from 'svelte/store';

const data: NotificationPropsInterface = {
	open: false,
	content: 'Description goes here',
	type: 'info'
};

const notificationStore = writable(data);

const closeNotification = () => {
	notificationStore.update(() => {
		return {
			...data,
			open: false
		};
	});
};

export { closeNotification, notificationStore };
