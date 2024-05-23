<script lang="ts">
	import { svocal } from '$lib/svocal';
	import { createEventDispatcher } from 'svelte';

	export let img: {
		url: string;
		height: number;
		width: number;
	};
	export let imgEleHeight: number | null = null;
	export let isPaused: boolean;

	const aspectRatio = img.width / img.height;

	const showOverlay = svocal('settings-showPause');
	$: isOverlayShown = $showOverlay && isPaused;

	const dispatch = createEventDispatcher<{
		close: null;
	}>();
</script>

<svelte:window
	on:keydown={({ key }) => {
		if (key === 'Escape') dispatch('close', null);
	}}
/>

<div class="fixed inset-0 flex h-full w-full items-center justify-center overflow-hidden">
	<div class="absolute h-full w-full bg-black opacity-80" />
	<button
		style:--w={img.width}
		style:--h={img.height}
		style:--width={imgEleHeight ? `min(${imgEleHeight * aspectRatio * 1.25}px, 90%)` : 'unset'}
		class="max-h-[ 90%] relative aspect-[var(--w)/var(--h)] w-[--width] overflow-hidden rounded-xl shadow-2xl"
		on:click={() => {
			dispatch('close', null);
		}}
	>
		<img src={img.url} alt="The album cover" class="h-full w-full" />
		<div
			class="absolute inset-0 h-full w-full items-center justify-center bg-black bg-opacity-50 saturate-50"
			class:flex={isOverlayShown}
			class:hidden={!isOverlayShown}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-48 w-48 text-white"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
		</div>
	</button>
</div>
