<script lang="ts">
	import Button from '$lib/components/core/Button/Button.svelte';
	import FlexBox from '$lib/components/core/Container/FlexBox.svelte';
	import Text from '$lib/components/core/Text/Text.svelte';
	import type { InformationStepInterface } from '$lib/types/components';
	import Icon from '@iconify/svelte';
	import { quintOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	interface $$props {
		data: InformationStepInterface;
		onNext: () => void;
		onBack: () => void;
		onSkip: () => void;
		animDirection: 'right' | 'left';
	}

	export let data: $$props['data'];
	export let onNext: $$props['onNext'];
	export let onBack: $$props['onBack'];
	export let onSkip: $$props['onSkip'];
	export let animDirection: $$props['animDirection'] = 'right';
</script>

<div
	transition:scale={{ duration: 500, delay: 10, opacity: 0.5, start: 0.5, easing: quintOut }}
	class="flex flex-col justify-start items-center fixed top-0 left-0 w-full h-full gap-[16px] z-[200]">
	{#key data}
		<div
			in:fly={{
				x: animDirection === 'left' ? '100%' : '-100%',
				duration: 1000,
				delay: 10,
				easing: quintOut,
				opacity: 1
			}}
			out:fly={{
				x: animDirection === 'right' ? '100%' : '-100%',
				duration: 1000,
				delay: 10,
				easing: quintOut,
				opacity: 1
			}}
			class="w-full h-full fixed top-0 left-0 gap-[16px] z-[200] pt-[32px]">
			<img src={$$props.data.image} alt="" class="absolute top-0 left-0 z-[-10] bg-surface" />
			<FlexBox
				intent="flexColTop"
				px="large"
				gap="small"
				class="w-full h-full max-h-fit mt-[80px]">
				<FlexBox
					intent="flexRowCenter"
					px="small"
					py="xsmall"
					class="rounded-3xl bg-[#D8FFDB]">
					<Text intent="p1" class="font-bold">{$$props.data.title}</Text>
				</FlexBox>
				<Text intent="h4" class="font-medium text-center">
					{$$props.data.description}
				</Text>
			</FlexBox>
			<FlexBox
				intent="flexColTop"
				class="w-full gap-[16px] p-[24px] bg-surface absolute bottom-[16px]">
				<Button
					intent="primary"
					size="large"
					class="flex items-center justify-center gap-[8px]"
					fullWidth
					onClick={onNext}>
					Siguiente <Icon icon="bi:arrow-right" class="text-on-secondary" />
				</Button>
				<Button
					intent="text"
					size="large"
					class="text-on-surface"
					fullWidth
					onClick={onSkip}>
					Omitir
				</Button>
			</FlexBox>
		</div>
	{/key}
</div>
