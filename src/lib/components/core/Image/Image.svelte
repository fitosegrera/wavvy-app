<script lang="ts">
	interface $$Props {
		size?: 'cover' | 'contain';
		href: string;
		width: number;
		height: number;
		styles: string;
	}

	export let href: $$Props['href'] = '';
	export let width: $$Props['width'] = 160;
	export let height: $$Props['height'] = 160;
	export let size: $$Props['size'] = 'cover';
	export let styles: $$Props['styles'] = '';
</script>

<div
	style="--background: url('{href}') ; --width: {width}px; --height: {height}px; --size: {size}"
	class={styles} />

<style>
	div {
		background-image: var(--background);
		background-size: var(--size);
		background-position: 'center';
		background-repeat: no-repeat;
		width: var(--width);
		height: var(--height);
	}
</style>
