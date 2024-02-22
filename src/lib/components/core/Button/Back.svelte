<script lang="ts">
	import Icon from '@iconify/svelte';

	function onClick() {
		history.back();
	}
</script>

<button on:click={onClick} class="text-on-surface">
	<Icon icon="ic:outline-arrow-back" width="24" height="24" />
</button>
