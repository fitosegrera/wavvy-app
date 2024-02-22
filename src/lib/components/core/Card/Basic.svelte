<script lang="ts">
	import Button from '../Button/Button.svelte';
	import FlexBox from '../Container/FlexBox.svelte';
	import Text from '../Text/Text.svelte';

	interface $$Props {
		title: string;
		description: string;
		onClick?: () => void;
	}
</script>

<FlexBox
	{...$$props}
	intent="flexColTop"
	class="max-w-[284px] bg-surface shadow-md rounded-lg min-h-full hover:scale-[102%] transition-all duration-300 group"
>
	<div
		class="bg-[url('assets/images/paddle-1.jpg')] bg-cover bg-center bg-no-repeat w-[284px] h-[240px] rounded-t-lg group-hover:blur-[2px] group-hover:brightness-[110%] transition-all duration-300"
	/>
	<FlexBox intent="flexColLeft" px="medium" py="medium" gap="medium">
		<Text intent="h4">{$$props.title}</Text>
		<Text intent="p1" class="text-on-surface-dark">
			{$$props.description}
		</Text>
		<Button fullWidth onClick={$$props.onClick}>Click</Button>
	</FlexBox>
</FlexBox>
