<script lang="ts">
	import { BackButton, MagicLogIn } from '$lib/components';
</script>

<BackButton />
<MagicLogIn
	redirectTo={`'http://localhost:5173/confirmation'`}
	buttonText="Inicio"
	inputPlaceholder="Email"
	inputName="email"
/>
