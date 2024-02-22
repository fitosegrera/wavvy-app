import { PUBLIC_SOCKET_SERVER_URL } from '$env/static/public';
import { cartStore } from '$lib/stores/orders';
import { reservationTimersStore } from '$lib/stores/reservations';
import type { ReservationTimersInterface } from '$types/reservations';
import type { ItemInterface } from '$types/station';
import { io, type Socket as IOSocket } from 'socket.io-client';
import { get } from 'svelte/store';
import { removeFromCart } from './ordersUtils';

const socket = (() => {
	const init = (authToken: string) => {
		const socket = io(PUBLIC_SOCKET_SERVER_URL, {
			transports: ['websocket'],
			upgrade: false,
			auth: {
				token: authToken
			}
		});

		return socket;
	};

	const onConnect = (socket: IOSocket) => {
		socket.on('connect', () => {
			console.log('connected');
			return 'connected';
		});
	};

	const onConnectError = (socket: IOSocket) => {
		socket.on('connect_error', (err) => {
			console.log(err.message);
			return err;
		});
	};

	const onDisconnect = (socket: IOSocket) => {
		socket.on('disconnect', () => {
			console.log('disconnected');
			socket.removeAllListeners();
			return 'disconnected';
		});
	};

	const onReservation = (socket: IOSocket) => {
		const reservationTimers: ReservationTimersInterface[] = get(reservationTimersStore);
		socket.on('onReservation', (res: ReservationTimersInterface) => {
			console.log('onReservation', res);
			reservationTimers?.push(res);
			reservationTimersStore.set(reservationTimers);
		});
	};

	const onReservationTimeUpdate = (socket: IOSocket) => {
		const reservationTimers: ReservationTimersInterface[] = get(reservationTimersStore);
		socket.on('onReservationTimeUpdate', (res: ReservationTimersInterface) => {
			// console.log('onReservationTimeUpdate', res);
			if (reservationTimers && reservationTimers !== undefined) {
				reservationTimers.forEach((timer: ReservationTimersInterface) => {
					if (res.id && timer.id === res.id) {
						// Update timer
						timer.currentTime = res.currentTime;
						// Update store
						reservationTimersStore.set(reservationTimers);

						if (res.status === 'expired' || res.status === 'canceled') {
							// Remove timer from store

							reservationTimersStore.set(
								reservationTimers.filter(
									(timer: ReservationTimersInterface) => timer.id !== res.id
								)
							);
							// Remove item from cart
							const cart = get(cartStore);
							removeFromCart(res.item, 'available', cart.total);
						}
					}
				});
			}
		});
	};

	const createReservation = (socket: IOSocket, data: ItemInterface) => {
		socket.emit('createReservation', data);
	};

	const cancelReservation = (socket: IOSocket, data: ItemInterface) => {
		socket.emit('cancelReservation', data);
	};

	return {
		init,
		onConnect,
		onConnectError,
		onDisconnect,
		onReservation,
		createReservation,
		onReservationTimeUpdate,
		cancelReservation
	};
})();

export default socket;
