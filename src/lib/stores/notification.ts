import type { NotificationProps } from '$types/components';
import { writable } from 'svelte/store';

const data: NotificationProps = {
	open: false,
	title: 'Title',
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
