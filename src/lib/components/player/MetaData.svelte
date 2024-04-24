<script lang="ts">
	export let name: string;
	export let releaseDate: string;
	export let artists: {
		name: string;
	}[];
</script>

<div class="bg-white bg-opacity-80 bg-clip-text text-transparent">
	<h2 class=" text-5xl font-semibold leading-tight">{name}</h2>
	<span class="flex gap-4 text-xl leading-loose">
		<span class="flex items-center gap-2">
			<iconify-icon icon="zondicons:time" class="text-white" />
			{new Date(releaseDate).toLocaleDateString()}
		</span>
		{#each artists as artist}
			<span>
				{artist.name}
			</span>
		{/each}
	</span>
</div>
