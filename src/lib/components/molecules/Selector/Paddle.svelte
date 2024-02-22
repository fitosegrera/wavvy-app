<script lang="ts">
	import { Button, FlexBox, Text } from '$lib/components';
	import { classNames } from '$lib/utils/classNames';

	interface PaddleProps {
		id: string;
		status: 'available' | 'not-available';
		selected: boolean;
		onSelect: (id: string, time: number, selected: boolean) => void;
	}

	export let id: PaddleProps['id'] = '';
	export let status: PaddleProps['status'] = 'available';
	export let selected: PaddleProps['selected'] = false;
	export let onSelect: PaddleProps['onSelect'];

	const disabled = status === 'available' ? false : true;
	let selectedTime = 1;
</script>

<Button
	fullWidth
	intent="unstyled"
	class={classNames(
		'w-full h-full space-y-[24px] rounded-md flex-flex-col items-center justify-center py-[32px] px-[24px]',
		status === 'available' ? 'bg-surface-light' : 'bg-status-disabled',
		selected ? 'border-2 border-primary-light' : 'border-2 border-surface-light'
	)}
	{disabled}
	onClick={() => {
		selected = !selected;
		onSelect(id, selectedTime, selected);
	}}>
	<FlexBox>
		<!-- <Text intent="p1" variant="inverted">Item</Text> -->
		<Text intent="h6" variant={!disabled ? 'accent' : 'dim'}>Paddle {id}</Text>
	</FlexBox>
	<FlexBox>
		<Text intent="p1" variant="dim">Estado</Text>
		<Text intent="p1" variant={!disabled ? 'success' : 'error'}>
			{status === 'available' ? 'Disponible' : 'No disponible'}
		</Text>
	</FlexBox>
	<FlexBox intent="flexColCenter">
		<select
			bind:value={selectedTime}
			{disabled}
			name="rent-time"
			id="rent-time"
			class="px-[8px] py-[4px] border rounded-sm disabled:bg-status-disabled bg-surface-light border-on-furface text-on-surface">
			<option value={1}>1 hora</option>
			<option value={2}>2 horas</option>
			<option value={3}>3 horas</option>
			<option value={4}>4 horas</option>
		</select>
	</FlexBox>

	<!-- <Button fullWidth size="small" {disabled} class="bg-secondary">Seleccionar</Button> -->
</Button>
