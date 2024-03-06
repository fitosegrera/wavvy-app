/* eslint-disable @typescript-eslint/no-unused-vars */
import { browser } from '$app/environment';
import MobileDetect from 'mobile-detect';
import { writable } from 'svelte/store';

type Appstate = () => string;
type DisplayChange = () => void;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile: string | null = md.mobile();
let standalone: string;

if (navigator.standalone) {
	standalone = 'standalone-ios';
}
if (browser && window.matchMedia('(display-mode: standalone)').matches) {
	standalone = 'standalone';
}
const getState: Appstate = () => {
	if (document.visibilityState === 'hidden') {
		return 'hidden';
	}
	if (document.hasFocus()) {
		return 'active';
	}
	return 'passive';
};

let displayState: string = getState();

const onDisplayStateChange: DisplayChange = () => {
	const nextState: string = getState();
	const prevState: string = displayState;

	if (nextState !== prevState) {
		console.log(`State changed: ${prevState} >>> ${nextState}`);
		displayState = nextState;
		state.set(displayState);
		//standalone will restrict to only running for an installed PWA on mobile
		if (nextState === 'active' && isMobile /* && standalone */) {
			//The app/browser tab has just been made active and is visible to the user
			//do whatever you want in here to update dynamic content, call api etc
		}
	}
};
//subscribe to all of the events related to visibility
['pageshow', 'focus', 'blur', 'visibilitychange', 'resume'].forEach((type) => {
	browser && window.addEventListener(type, onDisplayStateChange, { capture: true });
});

export const appState = writable<string>('active');
