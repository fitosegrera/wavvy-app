<script lang="ts">
	import { error, status, stream } from '$lib/stores/scanner';
	import type {
		UseUserMediaStatusType,
		UseUserMediaStreamType,
		UseUserMediaType
	} from '$types/components';
	import { onMount } from 'svelte';

	let mounted;

	onMount(() => {
		mounted = true;

		return () => {
			console.log('stop Component destroyed');

			// stopMedia();
		};
	});

	const isMediaStream = (
		candidate: MediaStream | MediaSource | Blob | null
	): candidate is MediaStream => candidate !== null && 'getTracks' in candidate;

	function setStatus(params: UseUserMediaStatusType) {
		console.log(`Setting status ${params}`);

		$status = params as UseUserMediaStatusType;
	}

	export const useUserMedia = (): UseUserMediaType => {
		$stream = null;
		$error = null;
		$status = 'stopped' as UseUserMediaStatusType;

		function setError(params: string) {
			console.log('Setting erro');
			$error = params;
		}

		function setStream(params: UseUserMediaStreamType) {
			console.log(`Setting stream`, { params });
			$stream = params as UseUserMediaStreamType;
		}

		const startMediaStream = (): void => {
			setStatus('pending' as UseUserMediaStatusType);

			navigator.mediaDevices
				.getUserMedia({
					audio: false,
					video: {
						facingMode: 'environment'
					}
				})
				.then((userStream) => {
					setStream(userStream as UseUserMediaStreamType);
					setStatus('resolved' as UseUserMediaStatusType);
				})
				.catch((err) => {
					setError(err);
					setStatus('rejected' as UseUserMediaStatusType);
				});
		};

		const stopMediaStream = stopMedia;
		return { stopMediaStream, startMediaStream };
	};

	function stopMedia(): void {
		console.log('stopping media stream');

		if (isMediaStream($stream)) {
			$stream.getTracks().forEach((track) => {
				track.stop();
				if ($stream) $stream.removeTrack(track);
			});

			console.log({ streams: $stream });

			setStatus('stopped' as UseUserMediaStatusType);
		}
	}
</script>
