import { writable } from 'svelte/store';

export const serviceWorkerRegistration = writable<ServiceWorkerRegistration | null>(null);
