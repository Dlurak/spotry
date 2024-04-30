<script lang="ts">
	import { svocal } from '$lib/svocal';
	import tilt from 'svelte-tilt';

	export let img: {
		url: string;
		height: number;
		width: number;
	};

	const aspectRatio = img.width / img.height;

	let imgEleHeight: number | null = null;

	export let isPaused: boolean;

	const showOverlay = svocal('settings-showPause');

	$: isOverlayShown = $showOverlay && isPaused;
</script>

<div class="flex h-full w-full items-center justify-center">
	<div bind:clientHeight={imgEleHeight} class="flex h-full items-center justify-center">
		<div
			style:--w={img.width}
			style:--h={img.height}
			style:--width={imgEleHeight ? `min(${imgEleHeight * aspectRatio}px, 100%)` : 'unset'}
			class="relative aspect-[--w/--h] w-[--width] overflow-hidden rounded-xl shadow-2xl"
			use:tilt={{
				reverse: true,
				strength: 0.5
			}}
		>
			<img src={img.url} alt="The album cover" />
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
		</div>
	</div>
</div>
