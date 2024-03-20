/* eslint-disable @typescript-eslint/no-explicit-any */

// MODAL
export interface ModalActionType {
	label: string;
	action: (() => void) | null;
}

export interface ModalPropsInterface {
	open: boolean;
	title: string;
	content: string;
	actions: {
		primary: ModalActionType | null;
		secondary: ModalActionType | null;
	};
	onClose?: () => void;
}

// SCREENS
export interface ScreenInterface {
	title: string;
	icon: any;
	active: boolean;
}

// NOTIFICATION
export type NotificationStatusType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationPropsInterface {
	open: boolean;
	content: string;
	type: NotificationStatusType;
}

// SCANNER
export type UseUserMediaStatusType = 'pending' | 'resolved' | 'rejected' | 'stopped' | 'none';

export type UseUserMediaStreamType = MediaStream | null;

export interface UseUserMediaType {
	stopMediaStream: () => void;
	startMediaStream: () => void;
}

// LEGAL SCREEN
export interface LegalScreenInterface {
	open: boolean;
	withActions: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

// INSTRUCTIONS STEP
export interface InformationStepInterface {
	title: string;
	description: string;
	image: string;
}
