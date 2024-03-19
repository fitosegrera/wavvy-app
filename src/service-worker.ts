/* eslint-disable @typescript-eslint/no-explicit-any */
import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

const precache_list = [...build, ...files, ...prerendered].map((s) => ({
	url: s,
	revision: version
}));

precacheAndRoute(precache_list);

self.addEventListener('push', (event: any) => {
	const payload = JSON.parse(event.data.text()) ?? 'no payload';
	console.log('Push Recieved...', payload);
	const registration = (self as any).registration as ServiceWorkerRegistration;
	event.waitUntil(
		registration.showNotification(payload.title, {
			body: payload.body,
			icon: payload.icon
		})
	);
});
