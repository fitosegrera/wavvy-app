<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { BaseLayout, Button, FlexBox, Text } from '$lib/components';
	import { onMount } from 'svelte';

	interface BeforeInstallPromptEvent extends Event {
		readonly platforms: string[];
		readonly userChoice: Promise<{
			outcome: 'accepted' | 'dismissed';
			platform: string;
		}>;
		prompt(): Promise<void>;
	}

	let deferredInstallEvent: BeforeInstallPromptEvent | undefined = undefined;

	onMount(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			deferredInstallEvent = e as BeforeInstallPromptEvent;
		});
	});

	const handleInstall = async () => {
		if (deferredInstallEvent !== undefined) {
			(deferredInstallEvent as BeforeInstallPromptEvent).prompt();
			let choice = await deferredInstallEvent.userChoice;
			if (choice.outcome === 'accepted') {
				// User accepted to install the application
			} else {
				// User dismissed the prompt
			}
			deferredInstallEvent = undefined;
		}
	};
</script>

<svelte:head>
	<title>Wavvy | Installation</title>
</svelte:head>

<BaseLayout>
	<FlexBox intent="flexColCenter" gap="large" class="w-full">
		<FlexBox intent="flexColCenter">
			<Button
				intent="unstyled"
				onClick={() => {
					console.log('Install Wavvy');
					handleInstall();
				}}
			>
				<FlexBox
					intent="flexRowCenter"
					gap="small"
					px="medium"
					py="small"
					class="border-2 border-gray-800 rounded-xl bg-surface"
				>
					<img src="/images/wavvy.svg" alt="Install Wavvy App" class="w-[64px]" />
					<FlexBox intent="flexColLeft">
						<Text intent="h6" class="font-normal text-on-surface-dark">Instalar ahora</Text>
						<Text intent="h4" class="">Wavvy App</Text>
					</FlexBox>
				</FlexBox>
			</Button>
		</FlexBox>
		<FlexBox intent="flexColCenter" class="w-[60%]">
			<Text intent="p1" class="text-center text-on-surface-dark"
				>Install Wavvy App haciendo click en el boton.</Text
			>
		</FlexBox>
	</FlexBox>
</BaseLayout>
