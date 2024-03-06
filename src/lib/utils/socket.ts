const socket = (() => {
	let ws: WebSocket;

	const init = () => {
		ws = new WebSocket('ws://localhost:3000/');
		return ws;
	};

	return { init };
})();

export default socket;
