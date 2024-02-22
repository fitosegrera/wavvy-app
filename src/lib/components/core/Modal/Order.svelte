<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import type { CustomerOrderInterface } from '$types/components';
	import { fly } from 'svelte/transition';

	export let title: string;
	export let message: string;
	export let content: CustomerOrderInterface;
	export let actions: {
		primary: {
			label: string;
			action: () => void;
		};
		secondary: {
			label: string;
			action: () => void;
		};
	};
</script>

<FlexBox intent="flexColCenter" class="mobile-width fixed z-[100] bg-surface top-0 left-0 h-full">
	<div
		transition:fly={{
			y: 400,
			duration: 200
		}}>
		<FlexBox intent="flexColCenter" class="rounded-lg shadow-lg bg-surface-light">
			<!-- <FlexBox px="small" py="small" intent="flexRowRight" class="">
				<button
					class="text-on-surface-light/80"
					on:click={() => {
						//
					}}>
					<CloseIcon class="h-[32px] w-[32px]" />
				</button>
			</FlexBox> -->
			<FlexBox px="large" intent="flexColLeft" gap="medium" class="py-[32px] w-full">
				<Text intent="h3">{title}</Text>
				<Text intent="p1">{message}</Text>
				<FlexBox px="small" py="small" class="w-full rounded-md bg-surface">
					{#each Object.keys(content) as key}
						<FlexBox intent="flexRowBetween" gap="xsmall" class="w-full ">
							{#if content[key].id}
								<Text intent="p1">{content[key].itemName}</Text>
								<Text intent="p1">seleccionado por</Text>
								<Text intent="p1">{content[key].rentTime} Hr</Text>
							{/if}
						</FlexBox>
					{/each}
				</FlexBox>
				<FlexBox intent="flexRowBetween" gap="xsmall" class="w-full">
					<Button
						intent="secondary"
						size="large"
						onClick={() => {
							actions.secondary.action();
						}}>
						{actions.secondary.label}
					</Button>

					<Button
						intent="primary"
						size="large"
						onClick={() => {
							actions.primary.action();
						}}>
						{actions.primary.label}
					</Button>
				</FlexBox>
			</FlexBox>
		</FlexBox>
	</div>
</FlexBox>
