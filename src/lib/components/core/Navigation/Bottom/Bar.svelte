<script lang="ts">
	import { FlexBox, Grid } from '$lib/components';
	import { appScreensStore as items } from '$lib/store/navigation/bottomBarItems';
	import Item from './Item.svelte';
</script>

<FlexBox
	intent="flexRowCenter"
	class="fixed z-[300] border-t-[2px] h-[80px] bottom-0 bg-surface mobile-width rounded-t-xl shadow-top">
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
