<!-- src/routes/auth/magic-login/+page.svelte -->
<script lang="ts">
	import { BackButton, BaseLayout, MagicLogIn } from '$lib/components';
</script>

<svelte:head>
	<title>MagicLogIn</title>
</svelte:head>

<BaseLayout>
	<BackButton />
	<MagicLogIn
		redirectTo={`'http://localhost:5173/confirmation'`}
		buttonText="Inicio"
		inputPlaceholder="Email"
		inputName="email" />
</BaseLayout>
