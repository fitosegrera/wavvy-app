<div>
	<div class="scanner-border scanner-border--top-left" />
	<div class="scanner-border scanner-border--top-right" />
	<div class="scanner-border scanner-border--bottom-left" />
	<div class="scanner-border scanner-border--bottom-right" />
</div>

<style>
	:root {
		--border-thickness: 6px;
		--border-radius: 80%;
		--border-offset: 5%;
		--border-color: #ffffff;
	}

	.scanner-border {
		position: absolute;
		z-index: 400;
		width: 15%;
		height: 15%;
	}

	.scanner-border--top-left {
		top: var(--border-offset);
		left: var(--border-offset);

		border-top: var(--border-thickness) solid var(--border-color);
		border-left: var(--border-thickness) solid var(--border-color);
		border-top-left-radius: var(--border-radius);
	}

	.scanner-border--top-right {
		top: var(--border-offset);
		right: var(--border-offset);

		border-top: var(--border-thickness) solid var(--border-color);
		border-right: var(--border-thickness) solid var(--border-color);
		border-top-right-radius: var(--border-radius);
	}

	.scanner-border--bottom-left {
		bottom: var(--border-offset);
		left: var(--border-offset);

		border-bottom: var(--border-thickness) solid var(--border-color);
		border-left: var(--border-thickness) solid var(--border-color);
		border-bottom-left-radius: var(--border-radius);
	}

	.scanner-border--bottom-right {
		right: var(--border-offset);
		bottom: var(--border-offset);

		border-right: var(--border-thickness) solid var(--border-color);
		border-bottom: var(--border-thickness) solid var(--border-color);
		border-bottom-right-radius: var(--border-radius);
	}
</style>
