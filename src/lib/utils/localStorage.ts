import { browser } from '$app/environment';

export const setLocalStorage = (key: string, value: string) => {
	return browser && window.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
	return browser && window.localStorage.getItem(key);
};

export const removeLocalStorage = (key: string) => {
	return browser && window.localStorage.removeItem(key);
};
