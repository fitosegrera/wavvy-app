<script lang="ts">
	import { FlexBox, Text } from '$lib/components';
	import { classNames } from '$lib/utils/classNames';
	import Icon from '@iconify/svelte';

	interface BackButtonProps {
		inverted?: boolean;
		onClick: () => void;
	}

	export let onClick: BackButtonProps['onClick'] = () => {};
	export let inverted: BackButtonProps['inverted'] = false;
</script>

<button on:click={() => onClick()} class="fixed top-0 w-full mt-[30px] z-[300]">
	<FlexBox intent="flexRowLeft" gap="xsmall" px="small" class="">
		<div class={classNames(!inverted ? 'text-on-surface' : 'text-surface')}>
			<Icon icon="ic:outline-arrow-back" width="24" height="24" />
		</div>
		<Text
			intent="p1"
			class={classNames(inverted ? 'text-surface' : 'text-on-surface', 'font-medium')}>
			Volver
		</Text>
	</FlexBox>
</button>
