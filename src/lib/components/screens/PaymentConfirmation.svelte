<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FlexBox, Spinner, Text } from '$lib/components';
	import { onMount } from 'svelte';

	let loading = true;

	onMount(() => {
		setTimeout(() => {
			loading = false;
		}, 2000);
	});
</script>

<FlexBox intent="flexColCenter" gap="medium" class="w-full h-full">
	{#if loading}
		<Spinner />
	{:else}
		<Text intent="h5">Confirmación de pago</Text>
		<Text class="text-center">Gracias por tu pago, haz clic en continuar para iniciar.</Text>
		<Button onClick={() => goto('/instructions')}>Continuar</Button>
	{/if}
</FlexBox>
