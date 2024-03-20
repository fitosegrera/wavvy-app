<script lang="ts">
	import { Button, Text } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { isLoading } from '$lib/store/auth';
	import { legalScreenStore } from '$lib/store/overlays/legal';
	import { classNames } from '$lib/utils/classNames';
	import Icon from '@iconify/svelte';
	import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
	import firebase from 'firebase/compat/app';

	const provider = new GoogleAuthProvider();
	export let disabled: boolean = false;

	const handleGoogleSignIn = (cb: (token: string) => void) => {
		var provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider)
			.then(function (result) {
				console.log('Google signin successful', result);
				// This gives you a Google Access Token. You can use it to access the Google API.
				// var token = result.credential.accessToken;

				// Send user  to rest of program
				const token = '';
				cb(token);
			})
			.catch(function (error) {
				console.error(error);
			});
		// signInWithPopup(auth, provider)
		// 	.then((result) => {
		// 		// This gives you a Google Access Token. You can use it to access the Google API.
		// 		const credential = GoogleAuthProvider.credentialFromResult(result);
		// 		const token = credential?.accessToken;
		// 		// The signed-in user info.
		// 		const user = result.user;
		// 		// IdP data available using getAdditionalUserInfo(result)
		// 		// ...
		// 		$isLoading = false;
		// 	})
		// 	.catch((error) => {
		// 		// Handle Errors here.
		// 		const errorCode = error.code;
		// 		const errorMessage = error.message;
		// 		// The email of the user's account used.
		// 		const email = error.customData.email;
		// 		// The AuthCredential type that was used.
		// 		const credential = GoogleAuthProvider.credentialFromError(error);
		// 		// ...
		// 		$isLoading = false;
		// 	});
	};

	const handleLegalScreen = () => {
		$legalScreenStore = {
			open: true,
			withActions: true,
			onCancel: () => {
				$legalScreenStore.open = false;
			},
			onConfirm: () => {
				$legalScreenStore.open = false;
				$isLoading = true;
				handleGoogleSignIn((token: string) => {});
			}
		};
	};
</script>

<Button
	intent="unstyled"
	fullWidth
	{disabled}
	class={classNames(
		'border-[2px] flex items-center justify-center relative',
		disabled ? 'text-gray-100/50 border-gray-100/50' : ' text-on-surface border-status-disabled'
	)}
	onClick={handleLegalScreen}>
	<Icon icon="flat-color-icons:google" class="absolute left-[12px]" />
	<Text class="font-medium">Inicia con Google</Text>
</Button>
