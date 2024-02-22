<script lang="ts">
	import { Button, Text } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { setLocalStorage } from '$lib/localStorage';
	import { sendSignInLinkToEmail } from 'firebase/auth';

	const actionCodeSettings = {
		// URL you want to redirect back to. The domain (www.example.com) for this
		// URL must be in the authorized domains list in the Firebase Console.
		url: $$props.redirectTo,
		// This must be true.
		handleCodeInApp: true
	};

	let error = '',
		message = '',
		loading = false,
		email = '';

	const submit = async () => {
		error = '';
		message = '';
		loading = true;

		sendSignInLinkToEmail(auth, email, actionCodeSettings)
			.then(() => {
				// The link was successfully sent. Inform the user.
				// Save the email locally so you don't need to ask the user for it again
				// if they open the link on the same device.

				setLocalStorage('emailForSignIn', email);
				message = `Hemos enviado un email a ${email}, por favor revisa tu bandeja de entrada y sigue las instrucciones para autenticarte.`;

				// ...
			})
			.catch((err) => {
				error = err.message;
				// ...
			});

		loading = false;
	};
</script>

<form on:submit|preventDefault={submit} class="space-y-[16px] w-full">
	<Text intent="h5">Ingresa tu email para autenticarte</Text>
	<input
		class=""
		type="email"
		name={$$props.inputName}
		placeholder={$$props.inputPlaceholder}
		bind:value={email} />
	<Button fullWidth>
		<span>
			{#if loading}
				Loading...
			{:else}
				{$$props.buttonText}
			{/if}
		</span>
	</Button>
	{#if error}
		<Text class="text-red-500">{error}</Text>
	{/if}
	{#if message}
		<Text>{message}</Text>
	{/if}
</form>

<style>
	input[type='email'] {
		background-color: theme('colors.surface.DEFAULT');
		color: theme('colors.on.surface.DEFAULT');
		border-radius: 8px;
		padding: 12px;
		width: 100%;
	}

	input[type='email']:focus {
		background-color: theme('colors.surface.DEFAULT');
		color: theme('colors.on.surface.DEFAULT');
	}

	input[type='email']:active {
		background-color: theme('colors.surface.DEFAULT');
		color: theme('colors.on.surface.DEFAULT');
	}
</style>
