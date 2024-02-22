<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/stores/auth';
	import type { User } from 'firebase/auth';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		auth.onAuthStateChanged((usr) => {
			if (usr) {
				$user = {
					loggedIn: true,
					user: usr as User
				};
				goto('/');
			} else {
				goto('/get-started');
			}
		});
	});
</script>

<svelte:head>
	<title>Wavvy</title>
</svelte:head>

<slot />
