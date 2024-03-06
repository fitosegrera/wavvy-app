<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Button,
		FlexBox,
		HomeScreen,
		LearnScreen,
		SessionsScreen,
		SettingsScreen,
		Text
	} from '$lib/components';
	import { user } from '$lib/store/auth';
	import { appScreensStore as items } from '$lib/store/navigation/bottomBarItems';
</script>

{#if user}
	{#each $items as item}
		{#if item.active}
			{#if item.title === 'Inicio'}
				<HomeScreen />
			{/if}
			{#if item.title === 'Sesiones'}
				<SessionsScreen />
			{/if}
			{#if item.title === 'Aprende'}
				<LearnScreen />
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
