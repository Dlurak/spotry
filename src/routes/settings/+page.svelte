<script>
	import Switch from '$lib/components/input/Switch.svelte';
	import { svocal } from '$lib/svocal';

	const showMetadata = svocal('settings-showMetadata');
</script>

<div class="flex flex-col gap-2 px-4 py-2">
	<span class="flex justify-between">
		<span> Show metadata </span>

		<Switch bind:checked={$showMetadata} />
	</span>
</div>
