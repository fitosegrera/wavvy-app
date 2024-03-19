import { browser, dev } from '$app/environment';
import { serviceWorkerRegistration } from '$lib/store/sw';

export const registerServiceWorker = async () => {
	// const registration = await navigator.serviceWorker.register('src/service-worker.ts', {
	// 	type: dev ? 'module' : 'classic'
	// });

	const registration = await navigator.serviceWorker.register('/service-worker.js', {
		type: dev ? 'module' : 'classic'
	});

	serviceWorkerRegistration.set(registration);
};

export const checkServiceWorkerSubscription = async () => {
	if (browser) {
		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.getRegistration();
			serviceWorkerRegistration.set(registration as ServiceWorkerRegistration | null);
		}
	}
};
