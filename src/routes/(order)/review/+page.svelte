<script lang="ts">
	import { BackButton, Button, FlexBox, Grid, Text } from '$lib/components';
	import { cartStore } from '$lib/stores/orders';
	import Icon from '@iconify/svelte';
</script>

<FlexBox intent="flexColTop" gap="medium" class="w-full h-full">
	<FlexBox intent="flexRowLeft" gap="small" class="w-full">
		<BackButton
			href="/time"
			onBack={() => {
				// $result = null;
				// cancelReservation(key);
			}} />
		<Text>Volver</Text>
	</FlexBox>
	<Text intent="h5">Tu orden</Text>
	<FlexBox intent="flexColTop" class="w-full">
		{#if $cartStore.items.length === 0}
			<Text intent="h6">No hay productos en tu orden</Text>
		{:else}
			<div class="w-full bg-surface-light/20 px-[16px] py-[16px] rounded-md">
				{#each $cartStore.items as item, i}
					{#if item.rentTime}
						<Grid intent="cols-4" class="w-full py-[8px]">
							<FlexBox intent="flexRowLeft" class="w-full">
								<Text class="font-bold">{item.name}</Text>
							</FlexBox>
							<FlexBox intent="flexRowCenter" class="w-full">
								<Text>{item.rentTime} Hrs</Text>
							</FlexBox>
							<FlexBox intent="flexRowCenter" class="w-full">
								<Text>${30000 * item.rentTime}</Text>
							</FlexBox>
							<FlexBox intent="flexRowRight" class="w-full">
								<Button
									intent="text"
									class="text-[20px]"
									onClick={() => {
										// removeFromCart(item, 'available', total);
										// handleReservations();
										// socket.cancelReservation(wavvySocket, item);
									}}>
									<Icon icon="mdi:trash-can-outline" class="-translate-y-[1px]" />
								</Button>
							</FlexBox>
						</Grid>
					{/if}
				{/each}
			</div>
		{/if}
	</FlexBox>
	<Button fullWidth intent="primary" class="w-full mt-[16px]">Pagar</Button>
</FlexBox>

<style>
	.image {
		height: 60px;
		width: 30px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
