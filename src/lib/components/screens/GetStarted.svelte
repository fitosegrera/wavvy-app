<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Button,
		FacebookButton,
		FlexBox,
		GoogleButton,
		Image,
		Spinner,
		Text
	} from '$lib/components';
	import { isLoading } from '$lib/store/auth';
	import { isOnline } from '$lib/store/network';
	import Icon from '@iconify/svelte';
</script>

{#if $isLoading}
	<FlexBox intent="flexColCenter" gap="medium" class="z-[250] w-full h-full overflow-hidden">
		<Spinner />
	</FlexBox>
{:else}
	<FlexBox intent="flexColTop" class="w-full h-full">
		<img
			class="absolute top-[-132px] -z-1 left-0 w-full pointer-events-none"
			src="/images/primary-bg-shape.svg"
			alt="" />
		<FlexBox intent="flexColCenter" class="z-10">
			<Image size="contain" href="/images/riding.png" width={390} height={380} />
		</FlexBox>
		<FlexBox intent="flexColCenter" gap="medium">
			<FlexBox intent="flexColCenter" gap="small" class="">
				<Text intent="h4" class="text-center text-on-surface">Inicia con Wavvy</Text>
				<Text intent="p1" class="text-center text-on-surface">
					Registrate para comenzar a disfrutar de la experiencia Wavvy
				</Text>
			</FlexBox>
			<FlexBox intent="flexColCenter" gap="xsmall" class="w-full">
				<Button
					intent="unstyled"
					disabled={!$isOnline}
					fullWidth
					onClick={() => goto('/magic-login')}
					class="border-[2px] border-[#CDDADA] flex items-center justify-center relative">
					<Icon
						icon="mdi:email-outline"
						width={16}
						class="absolute left-[12px] text-on-surface" />
					<Text class="font-medium">Inicia con email</Text>
				</Button>
				<FlexBox intent="flexRowBetween" gap="small">
					<div class="bg-[#CDDADA] w-full h-[2px]" />
					<Text>O</Text>
					<div class="bg-[#CDDADA] w-full h-[2px]" />
				</FlexBox>
				<GoogleButton disabled={!$isOnline} />
				<FacebookButton disabled={!$isOnline} />
			</FlexBox>
			<FlexBox intent="flexColCenter" class="w-full gap-[16px]">
				<Text intent="p2" class="text-center text-on-surface">
					Conoce nuestras
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span
						on:click={() => {}}
						on:keyup={() => {}}
						on:keydown={() => {}}
						class="font-bold text-primary-dark">
						politicas de privacidad
					</span>
					y
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span
						on:click={() => {}}
						on:keyup={() => {}}
						on:keydown={() => {}}
						class="font-bold text-primary-dark">
						terminos y condiciones
					</span>
				</Text>
			</FlexBox>
		</FlexBox>
	</FlexBox>
{/if}
