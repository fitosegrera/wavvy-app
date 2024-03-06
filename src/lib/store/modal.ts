import { writable } from 'svelte/store';

export const modalStore = (value: string) => {
	const { set, update, subscribe } = writable<string | null>(value);
	return {
		set,
		update,
		subscribe,
		setModal: () => set('joker')
	};
};
