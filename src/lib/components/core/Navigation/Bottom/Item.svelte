<script lang="ts">
	import { Text } from '$lib/components';
	import { classNames } from '$lib/utils/classNames';

	interface $$Props {
		label: string;
		icon: any;
		active: boolean;
		onClick: () => void;
	}

	export let label: $$Props['label'] = '';
	export let icon: $$Props['icon'] = null;
	export let active: $$Props['active'] = false;
	export let onClick: $$Props['onClick'] = () => {};
</script>

<button
	class="flex flex-col gap-[8px] items-center justify-center p-[12px]"
	on:click={() => {
		onClick();
	}}>
	<span class={classNames('h-[24px] w-[24px]', active ? 'text-primary' : 'text-on-surface-dark')}>
		<svelte:component this={icon} />
	</span>
	<Text intent="p2" class={classNames(active ? 'text-primary' : 'text-on-surface-dark')}>
		{label}
	</Text>
</button>
