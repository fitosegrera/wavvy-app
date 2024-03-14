<script lang="ts">
	import { FlexBox, Grid } from '$lib/components';
	import { appScreensStore as items } from '$lib/store/navigation/bottomBarItems';
	import Item from './Item.svelte';
</script>

<FlexBox
	intent="flexRowCenter"
	class="fixed z-[100] left-[50%] -translate-x-[50%] bottom-0 shadow-top bg-surface rounded-t-xl mobile-width">
	<Grid intent="cols-4" class="items-center w-full">
		{#each $items as screen, i}
			<Item
				label={screen.title}
				icon={screen.icon}
				active={screen.active}
				onClick={() => {
					$items.forEach((s, i) => {
						$items[i].active = false;
					});
					$items[i].active = true;
				}} />
		{/each}
	</Grid>
</FlexBox>
