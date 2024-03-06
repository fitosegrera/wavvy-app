<script lang="ts">
	import { Text, Youtube } from '$lib/components';
</script>

<div class="flex flex-col gap-[24px] mt-[32px]">
	<!-- <Text intent="h5" variant="accent">Antes de comenzar</Text>
	<Text intent="p1" variant="dim">
		Te recomendamos mires los videos instructivos para garantizar la mejor experiencia con
		Wavvy.
	</Text> -->
	<div class="flex flex-col gap-[12px]">
		<Text intent="h5" variant="accent">En tierra</Text>
		<Youtube id="yubSCrsmBaU" />
	</div>
	<div class="flex flex-col gap-[12px]">
		<Text intent="h5" variant="accent">¿Cómo montar en paddle?</Text>
		<Youtube id="ES2mShoQ3_Q" />
	</div>
	<!-- <Button onClick={() => goto('/start')} fullWidth>Continuar</Button> -->
</div>
