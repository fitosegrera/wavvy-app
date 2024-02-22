<script lang="ts">
	import { FlexBox, Grid } from '$lib/components';
	import { data } from '$lib/stores/bottomnav';
	import BottomItem from './BottomItem.svelte';
</script>

<FlexBox
	intent="flexRowCenter"
	class="fixed z-[999] left-[50%] -translate-x-[50%] bottom-0 shadow-top bg-surface rounded-t-xl mobile-width"
>
	{#if $data}
		<Grid intent="cols-3" class="items-center w-full">
			{#each $data as item, i}
				<BottomItem
					label={item.title}
					icon={item.icon}
					active={item.active}
					onClick={() => {
						$data.forEach((item) => {
							item.active = false;
						});
						$data[i].active = true;
					}}
				/>
			{/each}
		</Grid>
	{/if}
</FlexBox>
