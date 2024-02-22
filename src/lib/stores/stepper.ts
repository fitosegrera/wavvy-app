import { writable } from 'svelte/store';

import type { StepType } from '$types';

const data: StepType[] = [
	{
		title: 'Email',
		description: 'Porfavor introduce tu email para continuar.',
		type: 'email'
	},
	{
		title: 'Nombre',
		description: 'Dinos tu nombre porfavor.',
		type: 'firstName'
	},
	{
		title: 'Apellido',
		description: 'Dinos tu apellido porfavor.',
		type: 'lastName'
	},
	{
		title: 'Contraseña',
		description: 'Porfavor introduce una contraseña.',
		type: 'password'
	},
	{
		title: 'Confirma tu contraseña',
		description: 'Porfavor confirma tu contraseña.',
		type: 'confirmPassword'
	}
];

const userData = writable({
	email: '',
	firstName: '',
	lastName: '',
	password: '',
	confirmPassword: ''
});

const steps = writable(data);

const activeStep = writable(data[0]);

const setActiveStep = (step: StepType) => {
	activeStep.update(() => step);
};

export { activeStep, setActiveStep, steps, userData };
