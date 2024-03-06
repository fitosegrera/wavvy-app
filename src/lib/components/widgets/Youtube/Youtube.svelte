<script lang="ts">
	export let id: string = 'yubSCrsmBaU';
</script>

<div class="video-container">
	<iframe
		class="video"
		src={`https://www.youtube.com/embed/${id}`}
		title=""
		allow="accelerometer; encrypted-media; gyroscope;"
		frameborder="0"
		allowfullscreen>
	</iframe>
</div>

<style>
	.video-container {
		position: relative;
		padding-bottom: 56.25%;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.video {
		aspect-ratio: 16 / 9;
		width: 100%;
	}
</style>
