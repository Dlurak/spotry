<script lang="ts">
	export let name: string;
	export let releaseDate: string;
	export let artists: {
		name: string;
	}[];
</script>

<div
	class="flex h-full w-full items-center justify-center bg-white bg-opacity-80 bg-clip-text text-transparent"
>
	<div class="flex flex-col">
		<h2 class="text-balance text-center text-5xl font-semibold leading-tight md:text-start">
			{name}
		</h2>

		<span class="flex flex-wrap text-lg leading-loose">
			<span class="hidden items-center gap-2 md:flex">
				<iconify-icon icon="zondicons:time" class="text-white" />
				{new Date(releaseDate).toLocaleDateString()}
			</span>

			<div class="inline w-full text-center md:text-start">
				{artists.map(({ name }) => name).join(', ')}
			</div>
		</span>
	</div>
</div>
