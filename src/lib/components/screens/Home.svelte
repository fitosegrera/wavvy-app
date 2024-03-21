<script lang="ts">
	import { goto } from '$app/navigation';
	import { BackButton, Button, FlexBox, Image, InstructionsStep, Text } from '$lib/components';
	import { nicknames, user } from '$lib/store/auth';
	import type { InformationStepInterface } from '$lib/types/components';
	import { classNames } from '$lib/utils/classNames';

	let showSteps = false;
	let index = 0;
	let steps: InformationStepInterface[] = [
		{
			title: 'Paso 1',
			description: 'Escanea el código QR del paddle que deseas alquilar.',
			image: '/images/steps/step-1.png'
		},
		{
			title: 'Paso 2',
			description: 'Selecciona el tiempo que deseas usar el paddle.',
			image: '/images/steps/step-2.png'
		},
		{
			title: 'Paso 3',
			description: 'Revisa tu orden y paga.',
			image: '/images/steps/step-2.png'
		},
		{
			title: 'Paso 4',
			description: 'Desbloquea tu paddle y disfruta.',
			image: '/images/steps/step-2.png'
		}
	];

	let animDirection: 'right' | 'left' = 'left';

	const handleNext = () => {
		animDirection = 'left';
		if (index < steps.length - 1) {
			index += 1;
		} else {
			showSteps = false;
			goto('/scan');
		}
	};

	const handleBack = () => {
		animDirection = 'right';
		if (index > 0) {
			index -= 1;
		} else {
			showSteps = false;
		}
	};
</script>

<FlexBox intent="flexColTop" class="w-full h-full" py="medium" gap="small">
	{#if showSteps}
		<BackButton onClick={handleBack} />
		<InstructionsStep
			{animDirection}
			data={steps[index]}
			onNext={handleNext}
			onBack={handleBack}
			onSkip={() => goto('/scan')} />
	{/if}

	<img
		class="absolute top-[-80px] left-0 w-full pointer-events-none"
		src="/images/primary-bg-shape.svg"
		alt="" />
	<FlexBox
		intent="flexColTop"
		class={classNames($$props.class, 'max-w-fit max-h-fit z-10 mx-auto')}>
		<Image size="cover" href="/images/paddle.png" width={320} height={340} styles="" />
	</FlexBox>
	{#if $user?.email !== undefined}
		<Text intent="h4" class="text-on-surface">Hola, {$nicknames.displayName}</Text>
	{/if}
	<Text intent="h6" class="max-w-[75%] text-center font-normal">
		Navega hacia tu nueva aventura con <span class="font-bold">Wavvy</span>
		, la forma más rápida y conveniente de disfrutar del paddle boarding.
	</Text>
	<Button
		intent="primary"
		fullWidth
		size="large"
		class="mt-[12px]"
		onClick={() => {
			showSteps = true;
			index = 0;
		}}>
		Alquila tu paddle!
	</Button>
</FlexBox>
