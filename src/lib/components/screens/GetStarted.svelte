<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FacebookButton, FlexBox, GoogleButton, Spinner, Text } from '$lib/components';
	import { isLoading } from '$lib/store/auth';
	import { isOnline } from '$lib/store/network';
</script>

{#if $isLoading}
	<FlexBox intent="flexColCenter" gap="medium" class="w-full h-full">
		<Spinner />
	</FlexBox>
{:else}
	<FlexBox intent="flexColCenter" gap="2xlarge" class="w-full h-full ">
		<FlexBox intent="flexColCenter">
			<div class="image" style="background-image: url(/images/wavvy-logo.png)" />
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="small" class="w-full">
			<Button
				intent="primary"
				disabled={!$isOnline}
				fullWidth
				onClick={() => goto('/magic-login')}>
				Inicia con email
			</Button>
			<GoogleButton disabled={!$isOnline} />
			<FacebookButton disabled={!$isOnline} />
		</FlexBox>
		<FlexBox intent="flexColCenter" class="w-full gap-[16px]">
			<Text intent="p2" class="text-on-surface-dark">
				Conoce nuestras <span class="font-bold">politicas de privacidad</span>
				y
				<span class="font-bold">terminos y condiciones</span>
			</Text>
		</FlexBox>
	</FlexBox>
{/if}

<style>
	.image {
		height: 160px;
		width: 320px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
