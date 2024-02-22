import type { UserInterface } from './auth';
import type { BadgeStatusType } from './components';
import type { ItemInterface } from './station';

export interface OrderInterface {
	id: string;
	user: UserInterface;
	status: BadgeStatusType;
	createdAt: Date;
	rentTime: number;
}

export type CartType = ItemInterface[];

export interface CartInterface {
	items: CartType;
	total: number;
}
