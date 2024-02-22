<script>
	import { goto } from '$app/navigation';
	import { FlexBox, NotificationButton, Text } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { user } from '$lib/stores/auth';
	import { closeUser, openUser, userOpen } from '$lib/stores/topbar';
	import { clickOutside } from '$lib/utils/clickOutside';
	import { signOut } from 'firebase/auth';
	import { slide } from 'svelte/transition';

	const logOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
		// localStorage.removeItem('user');
	};
</script>

<header class="relative items-center w-full h-[80px] mobile-width bg-surface shadow-md">
	<div class="relative flex items-center justify-between w-full p-[20px]">
		<FlexBox intent="flexRowLeft" gap="xsmall" class="relative">
			<button
				class="relative block"
				on:click={() => {
					!$userOpen ? openUser() : closeUser();
				}}>
				{#if $user?.user?.photoURL}
					<div
						class="flex items-center justify-center w-[40px] h-[40px] mx-auto border-[2px] rounded-full bg-surface border-primary">
						<img
							alt={$user.user?.email}
							src={$user.user?.photoURL}
							class="object-cover w-[32px] h-[32px] mx-auto rounded-full" />
					</div>
				{:else}
					<div
						class="flex items-center justify-center w-[40px] h-[40px] mx-auto border-2 rounded-full bg-surface border-primary">
						<div
							class="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-primary">
							{#if $user?.user?.email !== undefined}
								<span class="font-medium text-on-primary">
									{$user?.user?.email?.charAt(0).toUpperCase()}
								</span>
							{/if}
						</div>
					</div>
				{/if}
			</button>

			{#if $user?.user?.email !== undefined}
				<Text class="text-on-surface-light">Hola, {$user?.user?.email?.split('@')[0]}</Text>
			{/if}

			{#if $userOpen}
				<div
					class="absolute left-0 z-10 w-48 rounded-md shadow-xl bg-surface top-12"
					transition:slide>
					<button
						use:clickOutside
						on:click_outside={() => {
							closeUser();
						}}
						on:click={() => {
							closeUser();
							logOut();
							goto('/get-started');
						}}
						class="block w-full px-4 py-2 text-sm transition-all duration-200 text-on-surface-dark hover:bg-surface-dark"
						role="menuitem">
						Sign out
					</button>
				</div>
			{/if}
		</FlexBox>
		<NotificationButton onClick={() => {}} />
	</div>
</header>
