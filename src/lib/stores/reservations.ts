import type {
	ReservationsAuthInterface,
	ReservationsInterface,
	ReservationTimersInterface
} from '$types/reservations';
import { writable } from 'svelte/store';

const reservations: ReservationsInterface = {
	reservationTimeOut: 0,
	userId: '',
	stationId: '',
	reservedItems: [],
	total: 0
};

const reservationsAuth: ReservationsAuthInterface = {
	authToken: '',
	room: '',
	userId: ''
};

const reservationTimers: ReservationTimersInterface[] = [];

const reservationsStore = writable(reservations);
const reservationsAuthStore = writable(reservationsAuth);
const reservationTimersStore = writable(reservationTimers);

export { reservationsAuthStore, reservationsStore, reservationTimersStore };
