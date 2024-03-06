<script lang="ts">
	import { FlexBox, Text } from '$lib/components';

	interface OfflineScreenProps {
		title: string;
		message: string;
	}

	export let title: OfflineScreenProps['title'] = 'Oops!';
	export let message: OfflineScreenProps['message'] =
		'Parece que no tienes conexión a internet. Revisa tu red móvil o conéctate a una red WiFi';
</script>

<FlexBox
	intent="flexColCenter"
	px="large"
	class="fixed top-0 left-0 z-[200] flex items-center justify-center w-full h-full bg-black/60 backdrop-blur-sm">
	<Text intent="h5" class="text-center">{title}</Text>
	<Text class="text-center">
		{message}
	</Text>
</FlexBox>
