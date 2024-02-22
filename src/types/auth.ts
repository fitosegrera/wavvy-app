import type { User } from 'firebase/auth';

export interface UserType {
	loggedIn: boolean;
	user: User | null;
}

export interface UserInterface {
	name: string;
	email: string;
	role: string;
}
