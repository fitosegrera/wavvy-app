<script lang="ts">
	import Icon from '@iconify/svelte';
	import FlexBox from '../Container/FlexBox.svelte';

	interface $$Props {
		onClick: () => void;
	}

	export let onClick = () => {};
</script>

<FlexBox intent="flexColCenter" class="relative">
	<div
		class="h-[8px] w-[8px] bg-red-400 rounded-full absolute top-[2px] right-[2px] border border-surface"
	/>
	<button on:click={onClick}>
		<Icon icon="mdi:bell" width="24" height="24" class="text-on-surface-light" />
	</button>
</FlexBox>
