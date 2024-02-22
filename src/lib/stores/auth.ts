import type { UserType } from '$types/auth';
import { writable } from 'svelte/store';

const initialUser: UserType = {
	loggedIn: false,
	user: null
};

export const user = writable(initialUser);
