<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FlexBox, Text } from '$lib/components';
	import { activeStep, setActiveStep, steps, userData } from '$lib/stores/stepper';
	import { validateEmail, validateName, validatePassword } from '$lib/utils/validation';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	$: activeStepIndex = $steps.findIndex((step) => step === $activeStep);
	$: fieldIsValid = false;
	$: fieldKey = $steps[activeStepIndex].type;
	$: warningMessage = '';
	$: value = $userData[fieldKey as keyof typeof $userData];
	$: passwordMissmatch = true;
	$: passwordVisible = false;

	const validate = (val: string) => {
		if (val === undefined) return;

		if (fieldKey === 'email') {
			fieldIsValid = validateEmail(val);
		}
		if (fieldKey === 'firstName') {
			fieldIsValid = validateName(val);
		}
		if (fieldKey === 'lastName') {
			fieldIsValid = validateName(val);
		}
		if (fieldKey === 'password') {
			fieldIsValid = validatePassword(val);
		}
		if (fieldKey === 'confirmPassword') {
			fieldIsValid = validatePassword(val);

			if ($userData.password === val) {
				passwordMissmatch = false;
			} else {
				passwordMissmatch = true;
			}
		}
	};

	const handleNext = () => {
		if (activeStepIndex < $steps.length - 1) {
			fieldIsValid && setActiveStep($steps[activeStepIndex + 1]);
			warningMessage = '';
		}
	};

	const handleBack = () => {
		if (activeStepIndex > 0) {
			setActiveStep($steps[activeStepIndex - 1]);
			warningMessage = '';
			validate(value);
		} else {
			goto('/get-started');
		}
	};

	const handleChange = (e: Event, key: string) => {
		const event = e?.target as HTMLInputElement;
		fieldKey = key;
		$userData[key as keyof typeof $userData] = event.value;
	};

	const handleWarning = () => {
		if (!fieldIsValid) {
			if (fieldKey === 'email') {
				warningMessage = 'Direccion de correo electronico invalida!';
			}
			if (fieldKey === 'firstName') {
				warningMessage = 'Tu nombre debe tener al menos 3 caracteres!';
			}
			if (fieldKey === 'lastName') {
				warningMessage = 'Tu apellido debe tener al menos 3 caracteres!';
			}
			if (fieldKey === 'password') {
				warningMessage =
					'Tu contraseña debe tener al menos 6 caracteres, un numero, una letra minuscula y una letra mayuscula!';
			}
			if (fieldKey === 'confirmPassword') {
				if (passwordMissmatch) {
					warningMessage = 'Las contraseñas no coinciden!';
				}
			}
		}
	};

	onMount(() => {
		validate(value);
	});
</script>

<FlexBox intent="flexColTop" class="flex-1 w-full" gap="large">
	<button class="" on:click={handleBack}>
		<Icon icon="ic:outline-arrow-back" width="24" height="24" />
	</button>
	<FlexBox intent="flexColLeft" gap="medium" class="w-full">
		<Text intent="h3">{$steps[activeStepIndex].title}</Text>
		<Text>{$steps[activeStepIndex].description}</Text>
		{#if $steps[activeStepIndex].type === 'email'}
			<input
				type="email"
				placeholder=""
				class="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[48px] max-h-[48px]"
				required
				bind:value={$userData.email}
				on:change={(event) => {
					handleChange(event, 'email');
				}}
			/>
		{/if}
		{#if $steps[activeStepIndex].type === 'firstName'}
			<input
				type="text"
				placeholder=""
				class="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[48px] max-h-[48px]"
				required
				bind:value={$userData.firstName}
				on:change={(event) => {
					handleChange(event, 'firstName');
				}}
			/>
		{/if}
		{#if $steps[activeStepIndex].type === 'lastName'}
			<input
				type="text"
				placeholder=""
				class="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[48px] max-h-[48px]"
				required
				bind:value={$userData.lastName}
				on:change={(event) => {
					handleChange(event, 'lastName');
				}}
			/>
		{/if}
		{#if $steps[activeStepIndex].type === 'password'}
			<FlexBox intent="flexRowCenter" class="relative w-full">
				{#if passwordVisible}
					<input
						type="text"
						placeholder=""
						class="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[48px] max-h-[48px]"
						required
						bind:value={$userData.password}
						on:change={(event) => {
							handleChange(event, 'password');
						}}
					/>
				{:else}
					<input
						type="password"
						placeholder=""
						class="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[48px] max-h-[48px]"
						required
						bind:value={$userData.password}
						on:change={(event) => {
							handleChange(event, 'password');
						}}
					/>
				{/if}
				<button
					class="absolute inset-y-0 right-0 flex items-center px-4"
					on:click={() => {
						passwordVisible = !passwordVisible;
					}}
				>
					<Icon
						icon={passwordVisible ? 'mdi:eye' : 'mdi:eye-off'}
						width="24"
						height="24"
						color="gray"
					/>
				</button>
			</FlexBox>
		{/if}
		{#if $steps[activeStepIndex].type === 'confirmPassword'}
			<FlexBox intent="flexRowCenter" class="relative w-full">
				{#if passwordVisible}
					<input
						type="text"
						placeholder=""
						class="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[48px] max-h-[48px]"
						required
						bind:value={$userData.confirmPassword}
						on:change={(event) => {
							handleChange(event, 'confirmPassword');
						}}
					/>
				{:else}
					<input
						type="password"
						placeholder=""
						class="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[48px] max-h-[48px]"
						required
						bind:value={$userData.confirmPassword}
						on:change={(event) => {
							handleChange(event, 'confirmPassword');
						}}
					/>
				{/if}
				<button
					class="absolute inset-y-0 right-0 flex items-center px-4"
					on:click={() => {
						passwordVisible = !passwordVisible;
					}}
				>
					<Icon
						icon={passwordVisible ? 'mdi:eye' : 'mdi:eye-off'}
						width="24"
						height="24"
						color="gray"
					/>
				</button>
			</FlexBox>
		{/if}
		{#if !fieldIsValid && warningMessage.length > 0}
			<Text intent="p2" class="text-red-400">
				{warningMessage}
			</Text>
		{/if}
		<Button
			intent="primary"
			fullWidth
			class=""
			onClick={() => {
				validate(value);

				if ($steps[activeStepIndex].type !== 'confirmPassword') {
					handleNext();
				} else {
					!passwordMissmatch && goto('/sign-up/confirmation');
				}

				handleWarning();
			}}
		>
			Next
		</Button>
	</FlexBox>
</FlexBox>
