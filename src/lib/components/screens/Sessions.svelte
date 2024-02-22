<script>
	import { goto } from '$app/navigation';
	import { Button, EditButton, FlexBox, Grid, StatusBadge, Text } from '$lib/components';
	import { orderHistoryStore } from '$lib/stores/orders';
</script>

<FlexBox intent="flexColLeft" gap="medium" py="medium" class="">
	<FlexBox
		intent="flexColCenter"
		py="medium"
		px="medium"
		gap="small"
		class="w-full rounded-xl bg-primary-light">
		<Text intent="h4" variant="inverted" class="font-bold text-primary-darker">
			Mis Sesiones
		</Text>
		<Text intent="p1" variant="inverted" class="text-center text-primary-darker">
			Haz click en <span class="font-medium">Alquilar paddle</span>
			para crear una nueva sesion y disfrutar de tu paddle board!
		</Text>
		<FlexBox intent="flexRowCenter" class="w-full mt-[16px]">
			<Button
				intent="unstyled"
				class="p-0 font-medium leading-none text-white bg-secondary"
				onClick={() => goto('/rent')}>
				Alquilar paddle
			</Button>
		</FlexBox>
	</FlexBox>
	{#each $orderHistoryStore as order, i}
		<Grid
			intent="cols-4"
			px="medium"
			py="medium"
			class="w-full shadow-sm auto-cols-fr rounded-xl bg-surface">
			<FlexBox intent="flexColCenter" class="w-full">
				<Text intent="p2" class="font-medium">{order.id}</Text>
			</FlexBox>
			<FlexBox intent="flexColCenter" class="w-full">
				<Text intent="p2" class="font-medium max-w-[124px] truncate">
					{order.createdAt.toLocaleDateString('en-US')}
				</Text>
			</FlexBox>
			<FlexBox intent="flexColCenter" class="w-full">
				<StatusBadge status={order.status} />
			</FlexBox>
			<FlexBox intent="flexColCenter" class="w-full">
				<EditButton onClick={() => {}} />
			</FlexBox>
		</Grid>
	{/each}
</FlexBox>
