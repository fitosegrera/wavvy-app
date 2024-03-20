<script lang="ts">
	import { Button, Text } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { isLoading } from '$lib/store/auth';
	import { legalScreenStore } from '$lib/store/overlays/legal';
	import { classNames } from '$lib/utils/classNames';
	import Icon from '@iconify/svelte';
	import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';

	const provider = new FacebookAuthProvider();
	export let disabled: boolean = false;

	const handleFacebookLogIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// The signed-in user info.
				const user = result.user;

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				const credential = FacebookAuthProvider.credentialFromResult(result);
				const accessToken = credential?.accessToken;

				$isLoading = false;
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = FacebookAuthProvider.credentialFromError(error);

				$isLoading = false;
				// ...
			});
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
				handleFacebookLogIn();
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
		disabled ? 'text-gray-100/50 border-gray-100/50' : ' text-on-surface border-[#CDDADA]'
	)}
	onClick={handleLegalScreen}>
	<Icon icon="logos:facebook" class="absolute left-[12px]" />
	<Text class="font-medium">Inicia con Facebook</Text>
</Button>
