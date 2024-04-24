<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { reason } = data;
</script>

<div class="flex">
	{#if reason === 'failed'}
		<div>You couldn't be registered because your identity couldn't been authorized</div>
	{:else if reason === 'noCode'}
		<div>You coulnd't been registered because of a failure on spotifies side</div>
	{:else if reason === 'access_denied'}
		<div>
			If you don't trust this project you can see the entire source code on GitHub to make sure no
			nasty things go on in here
		</div>
	{:else}
		<div>You couldn't been registered for an unknown reason</div>
	{/if}
</div>
