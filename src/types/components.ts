export interface ModalActionType {
	label: string;
	action: (() => void) | null;
}

export interface ModalProps {
	open: boolean;
	title: string;
	content: string;
	actions: {
		primary: ModalActionType | null;
		secondary: ModalActionType | null;
	};
}

export type StepType = {
	title: string;
	description: string;
	type: string;
};

export interface StepperProps {
	steps: StepType[];
	activeStep: number;
}

export type BadgeStatusType = 'active' | 'payed' | 'canceled';

export type NotificationStatusType = 'info' | 'success' | 'warning' | 'error';
export interface NotificationProps {
	open: boolean;
	title: string;
	content: string;
	type: NotificationStatusType;
}
