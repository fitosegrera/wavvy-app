<script lang="ts">
	import { classNames } from '$lib/utils/classNames';
	import FlexBox from '../Container/FlexBox.svelte';
	import Image from '../Image/Image.svelte';

	interface $$Props {
		title: string;
		description: string;
		onClick?: () => void;
		class: string;
	}
</script>

<FlexBox intent="flexColTop" class={classNames($$props.class, 'max-w-fit max-h-fit')}>
	<Image size="contain" href="/images/paddle.png" width={280} height={280} />
</FlexBox>
