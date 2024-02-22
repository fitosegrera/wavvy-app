import type { ItemInterface } from './station';

export interface ReservationTimersInterface {
	id: number | null;
	status: string | null;
	currentTime: number | null;
	item: ItemInterface;
}

export interface ReservationsInterface {
	reservationTimeOut: number;
	userId: string;
	stationId: string;
	reservedItems: ItemInterface[];
	total: number;
}

export interface ReservationsAuthInterface {
	authToken: string;
	room: string;
	userId: string;
}
