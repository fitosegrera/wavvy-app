<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		BaseLayout,
		Button,
		FacebookButton,
		FlexBox,
		GoogleButton,
		Text
	} from '$lib/components';
</script>

<svelte:head>
	<title>Wavvy | Home</title>
</svelte:head>

<BaseLayout>
	<FlexBox intent="flexColCenter" gap="2xlarge" class="w-full">
		<FlexBox intent="flexColCenter">
			<div class="image" style="background-image: url(/images/wavvy-logo.png)" />
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="small" class="w-full">
			<Button intent="primary" fullWidth onClick={() => goto('/magic-login')}>
				Inicia con email
			</Button>
			<GoogleButton />
			<FacebookButton />
		</FlexBox>
		<FlexBox intent="flexColCenter" class="w-full gap-[16px]">
			<Text intent="p2" class="text-on-surface-dark">
				Conoce nuestras <span class="font-bold">politicas de privacidad</span>
				y
				<span class="font-bold">terminos y condiciones</span>
			</Text>
		</FlexBox>
	</FlexBox>
</BaseLayout>

<style>
	.image {
		height: 160px;
		width: 320px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
