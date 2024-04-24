<script lang="ts">
	export let img: {
		url: string;
		width: number;
		height: number;
	};
</script>

<img
	src={img.url}
	width={img.width}
	height={img.height}
	alt="The album cover"
	class="fixed bottom-0 left-0 right-0 top-0 -z-50 h-full w-full object-cover opacity-100 blur-3xl brightness-75"
/>
