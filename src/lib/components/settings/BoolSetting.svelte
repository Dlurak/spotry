<script lang="ts">
	import Switch from '$lib/components/input/Switch.svelte';

	export let label: string
	export let checked: boolean
</script>

<span class="flex justify-between">
	<span>{label}</span>

	<Switch bind:checked={checked} />
</span>
