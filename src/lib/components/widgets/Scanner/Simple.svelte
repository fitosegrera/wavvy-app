<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let scanning = false;

	let html5Qrcode: Html5Qrcode | null = null;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
		start();
	}

	function start() {
		html5Qrcode?.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode?.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText: string, decodedResult: any) {
		alert(`Code matched = ${decodedText}`);
		console.log(decodedResult);
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<div class="fixed top-0 left-0 w-full h-full bg-black" />
<div id="wrapper" class="flex flex-col items-center justify-center">
	<reader id="reader" class="w-full rounded-3xl" />
</div>

<style>
	#wrapper {
		width: 100%;
		height: 100%;
	}
</style>
