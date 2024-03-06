<script lang="ts">
	import { Text } from '$lib/components';
	import { slide } from 'svelte/transition';

	export let title: string = 'title';
	let show: boolean = false;
</script>

<button
	class="flex items-center justify-start w-full p-4 rounded-lg collapse__header bg-surface-light"
	on:click={() => (show = !show)}>
	<Text variant="accent" class="font-medium">{title}</Text>
</button>
{#if show}
	<div class="collapse__body" transition:slide>
		<slot />
	</div>
{/if}

<style>
	.collapse__header {
		transition: background 200ms ease-in-out;
	}
</style>
