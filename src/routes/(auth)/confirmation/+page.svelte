<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { getLocalStorage, removeLocalStorage } from '$lib/localStorage';
	import { user } from '$lib/stores/auth';
	import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
	import { onMount } from 'svelte';

	let message: string = '';
	let error: Error | null = null;
	let loading: boolean = true;

	onMount(() => {
		let email = getLocalStorage('emailForSignIn');

		if (email && isSignInWithEmailLink(auth, window.location.href)) {
			console.log('Email link', email);

			signInWithEmailLink(auth, email, window.location.href)
				.then((result) => {
					removeLocalStorage('emailForSignIn');
					message = 'Te has autenticado correctamente. Redirigiendo...';
					loading = false;
					setTimeout(() => {
						goto('/');
					}, 2000);
				})
				.catch((err) => {
					error = new Error(err.message);
					loading = false;
				});
		}
	});
</script>

{#if !error}
	{#if loading}
		<h1>loading...</h1>
	{:else}
		<h1>Hola, {$user?.user?.email}</h1>
		<p>{message}</p>
	{/if}
{:else}
	<h1>Algo salio mal...</h1>
	<p>{error.message}</p>
{/if}
