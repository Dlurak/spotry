<script lang="ts">
	import tilt from 'svelte-tilt';

	export let img: {
		url: string;
		height: number;
		width: number;
	};

	export let isPaused: boolean;
</script>

<div class="flex h-full w-full items-center justify-center">
	<div
		class="relative z-50 h-full overflow-hidden rounded-lg shadow-2xl transition-all"
		use:tilt={{
			reverse: true,
			strength: 0.5
		}}
	>
		<img
			src={img.url}
			style:--w={img.width}
			style:--h={img.height}
			alt="The album cover"
			class="aspect-[--w/--h] h-full object-cover"
		/>
		<div
			class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 saturate-50"
			class:hidden={!isPaused}
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
