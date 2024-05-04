<script>
	import BoolSetting from '$lib/components/settings/BoolSetting.svelte';
	import { svocal } from '$lib/svocal';

	const showMetadata = svocal('settings-showMetadata');
	const hideCursor = svocal('settings-hideCursor');
	const showPause = svocal('settings-showPause');
	const tiltingEnabled = svocal('settings-tilting');
</script>

<div class="flex flex-col gap-2 px-4 py-2">
	<BoolSetting label="Show metadata" bind:checked={$showMetadata} />

	<BoolSetting label="Hide cursor on inactivity" bind:checked={$hideCursor} />

	<BoolSetting label="Show a overlay when paused" bind:checked={$showPause} />

	<BoolSetting label="Tilt image on hover" bind:checked={$tiltingEnabled} />
</div>
