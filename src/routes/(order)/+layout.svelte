<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { BaseLayout } from '$lib/components';
</script>

<svelte:head>
	<title>Wavvy App</title>
</svelte:head>

<BaseLayout>
	<slot />
</BaseLayout>
