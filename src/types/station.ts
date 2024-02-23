export type ItemState = 'available' | 'reserved' | 'rented' | 'unavailable' | null;

export interface ReservationItenrface {
	user: string;
}

export interface ItemInterface {
	id: number;
	name: string | null;
	rentTime: number | null;
	state: ItemState;
	reservation: ReservationItenrface;
}

export interface InventoryInterface {
	[key: string]: ItemInterface | null;
	p1: ItemInterface | null;
	p2: ItemInterface | null;
	p3: ItemInterface | null;
	p4: ItemInterface | null;
}

export interface MarketingInterface {
	discountRate: number;
	hourlyRate: number;
}

export interface StationInterface {
	id: string | null;
	name: string | null;
	inventory: InventoryInterface;
	loaded: boolean;
	marketing: MarketingInterface;
}
