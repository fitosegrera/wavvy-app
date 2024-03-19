// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		registration: any;
	}

	interface ServiceWorkerGlobalScope {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		registration: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		addEventListener: (type: string, listener: (event: any) => void) => void;
	}
}

export {};
