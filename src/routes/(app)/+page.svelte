<!-- src/routes/auth/home/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { HomeScreen, SessionsScreen, SettingsScreen, Text } from '$lib/components';
	import Button from '$lib/components/core/Button/Button.svelte';
	import FlexBox from '$lib/components/core/Container/FlexBox.svelte';
	import { user } from '$lib/stores/auth';
	import { data } from '$lib/stores/bottomnav';
</script>

<svelte:head>
	<title>Wavvy | Home</title>
</svelte:head>

{#if $user.loggedIn}
	{#each $data as item}
		{#if item.active}
			{#if item.title === 'Inicio'}
				<HomeScreen />
			{/if}
			{#if item.title === 'Sesiones'}
				<SessionsScreen />
			{/if}
			{#if item.title === 'Ajustes'}
				<SettingsScreen />
			{/if}
		{/if}
	{/each}
{:else}
	<FlexBox intent="flexColCenter" class="w-full h-full gap-[16px]">
		<Text intent="h6">No estas autenticado</Text>
		<Button intent="text" onClick={() => goto('/get-started')} class="text-blue-500">
			Salir
		</Button>
	</FlexBox>
{/if}
