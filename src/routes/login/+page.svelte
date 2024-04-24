<script>
	import { randomString } from '$lib/utils/strings/random';
</script>

<div class="flex justify-center px-4 py-4">
	<button
		class="flex items-center gap-2 rounded-full px-4 py-2 outline outline-2 outline-emerald-500"
		on:click={() => {
			// a random string to prevent caching
			window.location.href = `/auth?random=${randomString(16)}`;
		}}
	>
		<iconify-icon icon="mdi:spotify" />
		Login with Spotify
	</button>
</div>
