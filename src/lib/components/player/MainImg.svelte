<script lang="ts">
	export let img: {
		url: string;
		height: number;
		width: number;
	};

	export let isPaused: boolean;
</script>

<div
	class="relative z-50 overflow-hidden rounded-lg shadow-2xl transition-all"
	class:scale-75={isPaused}
>
	<img src={img.url} width={img.width} height={img.height} alt="The album cover" />
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
			class="h-48 w-48"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
	</div>
</div>
