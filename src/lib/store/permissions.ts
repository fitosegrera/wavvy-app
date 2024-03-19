import { writable } from 'svelte/store';
import type { PushPermissionTypes } from '$lib/types/permissions';
import { browser } from '$app/environment';

let storedPushPermission: PushPermissionTypes = 'default';
const pushNotificationsPermission = writable<PushPermissionTypes>(storedPushPermission);

const setup = () => {
	if (browser) {
		storedPushPermission = localStorage.getItem('pushPermission') as PushPermissionTypes;
		pushNotificationsPermission.set(storedPushPermission);
		pushNotificationsPermission.subscribe((value: PushPermissionTypes) => {
			localStorage.setItem('pushPermission', value);
		});

		console.log('storedPushPermission', storedPushPermission);
	}
};

setup();

export { pushNotificationsPermission };
