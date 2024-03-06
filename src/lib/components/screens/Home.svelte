<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FlexBox, InformationCard, Text } from '$lib/components';
</script>

<FlexBox intent="flexColTop" class="w-full h-full" py="medium" gap="medium">
	<InformationCard title="Get Started" description="" />
	<Text intent="h6" class="max-w-[75%] text-center font-normal">
		Navega hacia tu nueva aventura con <span class="font-bold">Wavvy</span>
		, la forma más rápida y conveniente de disfrutar del paddle boarding.
	</Text>
	<Button intent="primary" fullWidth size="large" onClick={() => goto('/scan')}>
		Alquila tu paddle!
	</Button>
</FlexBox>
