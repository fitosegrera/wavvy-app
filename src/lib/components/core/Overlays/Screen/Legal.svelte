<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import { legalScreenStore } from '$lib/store/overlays/legal';
	import { getLegalDataDb } from '$lib/utils/firestore';
	import { onMount } from 'svelte';

	let termsAndConditions: object | null = null;
	let privacyPolicy: object | null = null;

	let withActions: boolean = true;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const isWithActions = urlParams.has('withActions');

		if (isWithActions) {
			withActions = urlParams.get('withActions');
		}

		getLegalDataDb((data) => {
			if ('termsAndConditions' in data) {
				termsAndConditions = JSON.parse(data.termsAndConditions);
				privacyPolicy = JSON.parse(data.privacyPolicy);
			}
		});
	});
</script>

{#if termsAndConditions}
	<FlexBox
		intent="flexColLeft"
		px="medium"
		py="2xlarge"
		gap="medium"
		class="fixed mobile-width mx-auto top-0 left-[50%] -translate-x-[50%] z-[200] overflow-y-scroll overflow-x-none w-full h-full bg-surface">
		<!-- <CollapsibleSection title="Terminos & Condiciones"> -->
		<Text intent="h4" variant="accent">{termsAndConditions.titulo}</Text>
		<Text intent="p2" variant="dim">{termsAndConditions.introduccion}</Text>
		{#each termsAndConditions.secciones as seccion}
			<Text variant="accent" class="font-medium">{seccion.titulo}</Text>
			<Text intent="p2" variant="dim">{seccion.contenido}</Text>
		{/each}
		<Text intent="p2" variant="dim">{termsAndConditions.fecha_actualizacion}</Text>
		<Text intent="h4" variant="accent">Politica de Privacidad</Text>

		{#each Object.keys(privacyPolicy?.Politica_de_Privacidad) as politica}
			<Text intent="p1" variant="accent" class="font-medium capitalize">
				{politica.split('_').join(' ')}
			</Text>
			{#if typeof privacyPolicy?.Politica_de_Privacidad[politica] === 'string'}
				<Text intent="p2" variant="dim">
					{privacyPolicy?.Politica_de_Privacidad[politica]}
				</Text>
			{:else}
				<FlexBox intent="flexColLeft" gap="xsmall">
					{#each Object.keys(privacyPolicy?.Politica_de_Privacidad[politica]) as subPolitica}
						<Text intent="p2" class="font-medium capitalize">
							{subPolitica.split('_').join(' ')}
							<span class="font-normal text-[12px] text-on-surface/80">
								{' ' + privacyPolicy?.Politica_de_Privacidad[politica][subPolitica]}
							</span>
						</Text>
					{/each}
				</FlexBox>
			{/if}
		{/each}
		{#if withActions}
			<FlexBox intent="flexRowBetween" gap="small" class="w-full">
				<Button intent="secondary" fullWidth onClick={$legalScreenStore.onCancel}>
					Cancelar
				</Button>
				<Button intent="primary" fullWidth onClick={$legalScreenStore.onConfirm}>
					Acepto
				</Button>
			</FlexBox>
		{/if}
		<!-- </CollapsibleSection> -->
	</FlexBox>
{/if}
