<script lang="ts">
	import { FlexBox, Text } from '$lib/components';
	import { classNames } from '$lib/utils/classNames';
	import { type BadgeStatusType } from '$types/components';

	interface $$props {
		status: BadgeStatusType;
	}

	export let status = 'pending';
</script>

<FlexBox
	intent="flexColCenter"
	px="small"
	py="xsmall"
	class={classNames(
		'rounded-[64px] max-w-fit border-[1.5px]',
		status === 'payed' && 'border-status-success',
		status === 'active' && 'border-status-warning',
		status === 'canceled' && 'border-status-error'
	)}
>
	<Text
		intent="p2"
		class={classNames(
			'font-medium',
			status === 'payed' && 'text-status-success',
			status === 'active' && 'text-status-warning',
			status === 'canceled' && 'text-status-error'
		)}>{status}</Text
	>
</FlexBox>
