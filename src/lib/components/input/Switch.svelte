<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let checked = false;

	let height: number;
	let width: number;

	const dispatch = createEventDispatcher();
</script>

<div
	bind:clientHeight={height}
	bind:clientWidth={width}
	class="switch-parent h-7 w-14"
	style="--parent-height: {height || 28}px; --parent-width: {width || 56}px;"
>
	<input
		type="checkbox"
		role="switch"
		bind:checked
		class="relative h-full w-full appearance-none rounded-full bg-gray-400 checked:bg-green-500 dark:bg-gray-500 dark:checked:bg-green-400"
		on:change={() => {
			dispatch('change', checked);
		}}
	/>
</div>

<style>
	input::before {
		--height: calc(0.8 * var(--parent-height));
		--top: calc(calc(var(--parent-height) - var(--height)) / 2);

		content: '';
		position: absolute;

		top: var(--top);
		left: var(--top);

		height: var(--height);
		width: var(--height);

		border-radius: 100vmax;

		background-color: white;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);

		transition: all cubic-bezier(0.19, 1, 0.22, 1) 150ms;
	}

	input:checked::before {
		transform: translateX(calc(var(--parent-width) - var(--height) - var(--top) - var(--top)));
	}

	input {
		transition: all cubic-bezier(0.19, 1, 0.22, 1) 150ms;
	}
</style>
