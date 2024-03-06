import { writable } from 'svelte/store';

const reservationDuration: number | null = null;

export const reservationDurationStore = writable<number | null>(reservationDuration);
