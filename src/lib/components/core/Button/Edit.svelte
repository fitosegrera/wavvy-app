<script lang="ts">
	import Icon from '@iconify/svelte';
	import FlexBox from '../Container/FlexBox.svelte';

	interface $$Props {
		onClick: () => void;
	}

	export let onClick = () => {};
</script>

<FlexBox intent="flexColCenter" class="">
	<button on:click={onClick}>
		<Icon icon="bxs:edit" width="20" height="20" class="text-primary" />
	</button>
</FlexBox>
