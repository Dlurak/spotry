<script>
	import Switch from '$lib/components/input/Switch.svelte';
	import { svocal } from '$lib/svocal';

	const showMetadata = svocal('settings-showMetadata');
	const hideCursor = svocal('settings-hideCursor');
</script>

<div class="flex flex-col gap-2 px-4 py-2">
	<span class="flex justify-between">
		<span>Show metadata</span>

		<Switch bind:checked={$showMetadata} />
	</span>

	<span class="flex justify-between">
		<span>Hide cursor on inactivity</span>

		<Switch bind:checked={$hideCursor} />
	</span>
</div>
