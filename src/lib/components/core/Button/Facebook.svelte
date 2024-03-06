<script lang="ts">
	import { Button } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { isLoading } from '$lib/store/auth';
	import { classNames } from '$lib/utils/classNames';
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
</script>

<Button
	intent="unstyled"
	fullWidth
	{disabled}
	class={classNames(disabled ? 'bg-secondary/50 text-white/50' : 'bg-secondary text-white')}
	onClick={handleFacebookLogIn}>
	Inicia con Facebook
</Button>
