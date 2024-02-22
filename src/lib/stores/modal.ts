import type { ModalProps } from '$types/components';
import { writable } from 'svelte/store';

const data = {
	open: false,
	title: 'Modal Title',
	content: 'Modal description goes here',
	actions: {
		primary: {
			label: 'Primary',
			action: () => {}
		},
		secondary: {
			label: 'Secondary',
			action: () => {}
		}
	}
};

const modalStore = writable(data);

const closeModal = () => {
	modalStore.update(() => {
		return {
			...data,
			open: false
		};
	});
};

const openModal = () => {
	modalStore.update(() => {
		return {
			...data,
			open: true
		};
	});
};

const updateModal = (props: ModalProps) => {
	modalStore.update(() => {
		return {
			open: props.open,
			title: props.title,
			content: props.content,
			actions: {
				primary: {
					label: props.actions.primary?.label || '',
					action: props.actions.primary?.action || (() => {})
				},
				secondary: {
					label: props.actions.secondary?.label || '',
					action: props.actions.secondary?.action || (() => {})
				}
			}
		};
	});
};

export { closeModal, modalStore, openModal, updateModal };
