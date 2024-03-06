import type { LegalScreenInterface } from '$lib/types/components';
import { writable } from 'svelte/store';

const legalScreen: LegalScreenInterface = {
	open: false,
	onCancel: () => {},
	onConfirm: () => {}
};

export const legalScreenStore = writable(legalScreen);
