<script lang="ts">
	import { FlexBox, ModalBasic } from '$lib/components';
	import { modalStore } from '$lib/stores/modal';
	import { classNames } from '$lib/utils/classNames';
</script>

{#if $modalStore?.open}
	<ModalBasic />
{/if}
<FlexBox
	intent="flexColCenter"
	class={classNames(
		'fixed left-[50%] -translate-x-[50%] h-screen p-[24px] mobile-width',
		'bg-gradient-to-b from-surface to-surface-dark'
	)}>
	<slot />
</FlexBox>
