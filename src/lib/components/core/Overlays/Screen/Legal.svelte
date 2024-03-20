<script lang="ts">
	import { Button, CollapsibleSection, FlexBox, Text } from '$lib/components';
	import { legalScreenStore } from '$lib/store/overlays/legal';
	import { getLegalDataDb } from '$lib/utils/firestore';
	import { onMount } from 'svelte';

	let termsAndConditions: object | null = null;
	let privacyPolicy: object | null = null;

	let withActions: boolean | null = $legalScreenStore.withActions;

	onMount(() => {
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
		<Text intent="h4" variant="normal" class="mt-[32px]">Terminos y Condiciones</Text>
		<Text>
			Nor again is there anyone who loves or pursues or desires to obtain pain of itself,
			because it is pain, but occasionally circumstances occur in which toil and pain can
			procure him some great pleasure
		</Text>
		<Text>
			Qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed quia non numquam
			eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem
		</Text>
		<!-- <CollapsibleSection title="Terminos & Condiciones"> -->
		<!-- <Text intent="h4" variant="accent">{termsAndConditions.titulo}</Text>
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
		{/each} -->
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
