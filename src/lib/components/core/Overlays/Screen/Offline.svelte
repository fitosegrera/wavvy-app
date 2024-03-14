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
	class="fixed top-0 left-0 z-[600] flex items-center justify-center w-full h-full bg-black/70 backdrop-blur-sm">
	<Text variant="inverted" intent="h5" class="text-center">{title}</Text>
	<Text variant="inverted" class="text-center">
		{message}
	</Text>
</FlexBox>
