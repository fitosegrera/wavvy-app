<script>
	import { FlexBox, NotificationButton, Text } from '$lib/components';
	import { nicknames, user } from '$lib/store/auth';
</script>

<header class="relative items-center w-full h-[80px] mobile-width bg-surface shadow-md">
	<div class="relative flex items-center justify-between w-full p-[20px]">
		<FlexBox intent="flexRowLeft" gap="xsmall" class="relative">
			<button class="relative block" on:click={() => {}}>
				{#if $user?.photoURL}
					<div
						class="flex items-center justify-center w-[40px] h-[40px] mx-auto border-[2px] rounded-full bg-surface border-primary"
					>
						<img
							alt={$user.email}
							src={$user.photoURL}
							class="object-cover w-[32px] h-[32px] mx-auto rounded-full"
						/>
					</div>
				{:else}
					<div
						class="flex items-center justify-center w-[40px] h-[40px] mx-auto border-2 rounded-full bg-surface border-primary"
					>
						<div class="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-primary">
							{#if $user?.email !== undefined}
								<span class="font-medium text-on-primary">
									{$nicknames.initial}
								</span>
							{/if}
						</div>
					</div>
				{/if}
			</button>

			{#if $user?.email !== undefined}
				<Text class="text-on-surface-light">Hola, {$nicknames.displayName}</Text>
			{/if}
		</FlexBox>
		<NotificationButton onClick={() => {}} />
	</div>
</header>
