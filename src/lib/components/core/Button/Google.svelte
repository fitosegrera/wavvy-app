<script lang="ts">
	import { Button } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { isLoading } from '$lib/store/auth';
	import { legalScreenStore } from '$lib/store/overlays/legal';
	import { classNames } from '$lib/utils/classNames';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	const provider = new GoogleAuthProvider();
	export let disabled: boolean = false;

	const handleGoogleSignIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				// ...
				$isLoading = false;
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				$isLoading = false;
			});
	};

	const handleLegalScreen = () => {
		$legalScreenStore = {
			open: true,
			onCancel: () => {
				$legalScreenStore.open = false;
			},
			onConfirm: () => {
				$legalScreenStore.open = false;
				$isLoading = true;
				handleGoogleSignIn();
			}
		};
	};
</script>

<Button
	intent="unstyled"
	fullWidth
	{disabled}
	class={classNames(
		'border-[1.5px]',
		disabled ? 'text-gray-100/50 border-gray-100/50' : ' text-gray-100 border-gray-100'
	)}
	onClick={handleLegalScreen}>
	Inicia con Google
</Button>
