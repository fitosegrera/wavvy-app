<script lang="ts">
	import { Button, CloseIcon, FlexBox, Text } from '$lib/components';
	import { closeModal, modalStore } from '$lib/stores/modal';
	import type { ModalProps } from '$types/components';
	import { fly } from 'svelte/transition';

	const resetModalProps: ModalProps = {
		open: false,
		title: '',
		content: '',
		actions: {
			primary: null,
			secondary: null
		}
	};
</script>

<FlexBox
	intent="flexColCenter"
	class="mobile-width fixed z-[100] bg-surface top-0 debug-blue h-full">
	<div
		transition:fly={{
			y: 400,
			duration: 200
		}}>
		<FlexBox intent="flexColCenter" class="rounded-lg shadow-lg bg-surface-light">
			<FlexBox px="small" py="small" intent="flexRowRight" class="">
				<button
					class="text-on-surface-light/80"
					on:click={() => {
						closeModal();
					}}>
					<CloseIcon class="h-[32px] w-[32px]" />
				</button>
			</FlexBox>
			<FlexBox px="large" intent="flexColLeft" gap="large" class="pb-[32px] w-full">
				<Text intent="h3">{$modalStore.title}</Text>
				<Text intent="p1">{$modalStore.content}</Text>
				<FlexBox intent="flexRowBetween" gap="xsmall" class="w-full">
					{#if $modalStore.actions.secondary !== null}
						<Button
							intent="secondary"
							size="large"
							onClick={() => {
								if ($modalStore.actions.secondary.action !== null) {
									$modalStore.actions.secondary.action();
								} else {
									closeModal();
								}
							}}>
							{$modalStore.actions.secondary.label}
						</Button>
					{/if}
					<Button
						intent="primary"
						size="large"
						fullWidth={$modalStore.actions.secondary ? false : true}
						onClick={() => {
							if ($modalStore.actions.primary.action !== null) {
								$modalStore.actions.primary.action();
							} else {
								closeModal();
							}
						}}>
						{$modalStore.actions.primary.label}
					</Button>
				</FlexBox>
			</FlexBox>
		</FlexBox>
	</div>
</FlexBox>
