import { writable } from 'svelte/store';

const userOpen = writable(false);

const openUser = () => {
	userOpen.update(() => true);
};

const closeUser = () => {
	userOpen.update(() => false);
};

export { closeUser, openUser, userOpen };
