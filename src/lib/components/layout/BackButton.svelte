<script lang="ts">
	import { BackButton, FlexBox, ModalBasic, Text } from '$lib/components';
	import { modalStore } from '$lib/stores/modal';
	import { classNames } from '$lib/utils/classNames';
</script>

{#if $modalStore?.open}
	<ModalBasic />
{/if}
<FlexBox
	intent="flexColCenter"
	gap="medium"
	class={classNames(
		'fixed left-[50%] -translate-x-[50%] h-screen p-[24px] mobile-width',
		'bg-gradient-to-b from-surface to-surface-dark'
	)}>
	<FlexBox intent="flexRowLeft" gap="small" class="w-full">
		<BackButton />
		<Text>Volver</Text>
	</FlexBox>
	<slot />
</FlexBox>
