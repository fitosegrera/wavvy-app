<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	export let href: string | null = null;
	export let onBack: (() => void) | null = null;

	function onClick() {
		if (href) {
			goto(href);
		} else {
			history.back();
		}

		if (onBack) {
			onBack();
		}
	}
</script>

<button on:click={onClick} class="text-on-surface">
	<Icon icon="ic:outline-arrow-back" width="24" height="24" />
</button>
