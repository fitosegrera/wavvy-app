<script lang="ts">
	import FlexBox from '../Container/FlexBox.svelte';

	interface $$Props {
		title: string;
		description: string;
		onClick?: () => void;
	}
</script>

<FlexBox {...$$props} intent="flexColTop" class="max-w-fit max-h-fit">
	<div
		class={`bg-[url('/images/paddle.svg')] bg-contain bg-center bg-no-repeat w-[280px] h-[280px]`}
	/>
</FlexBox>
