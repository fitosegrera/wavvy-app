import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const messageStore = writable<string>('');
let socket: WebSocket;
let connectionTimer: NodeJS.Timeout | null = null;

const connect = () => {
	if (browser) {
		socket = new WebSocket('ws://localhost:3000/');

		// Connection opened
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		socket.addEventListener('open', (event: Event) => {
			console.log("It's open");
			if (connectionTimer) clearInterval(connectionTimer);
		});

		// Connection closed
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		socket.addEventListener('close', (event: CloseEvent) => {
			console.log("It's closed");
			connectionTimer = setInterval(() => {
				connect();
			}, 3000);
		});

		// Listen for messages
		socket.addEventListener('message', (event) => {
			messageStore.set(event.data);
		});
	}
};

// connect();

const sendMessage = (message: string) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
};

export default {
	subscribe: messageStore.subscribe,
	sendMessage
};
