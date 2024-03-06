import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const messageStore = writable<string>('');
let socket: WebSocket;

if (browser) {
	socket = new WebSocket('ws://localhost:3000/');

	// Connection opened
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	socket.addEventListener('open', (event: Event) => {
		console.log("It's open");
	});

	// Listen for messages
	socket.addEventListener('message', (event) => {
		messageStore.set(event.data);
	});
}

const sendMessage = (message: string) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
};

export default {
	subscribe: messageStore.subscribe,
	sendMessage
};
