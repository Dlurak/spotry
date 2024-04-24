<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getCurrentlyPlayingTrack } from '$lib/spotify/player';
	import { svocal } from '$lib/svocal';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import 'iconify-icon';
	import BgImage from '$lib/components/player/BgImage.svelte';
	import MetaData from '$lib/components/player/MetaData.svelte';
	import MainImg from '$lib/components/player/MainImg.svelte';
	import type { CurrentlyPlaying } from '$lib/spotify/schema/currentlyPlaying';
	import { getImages } from '$lib/utils/spotify/image';
	import { title } from 'nutzlich';

	const accessToken = svocal('accessToken');

	$: {
		if (!$accessToken && browser) goto('/login');
	}

	const data = writable<null | CurrentlyPlaying>(null);

	const load = () => {
		if (!$accessToken || document.hidden) return;

		getCurrentlyPlayingTrack({
			accessToken: $accessToken
		}).then(data.set);
	};

	onMount(() => {
		load();

		const intervalId = setInterval(load, 10_000);
		return () => clearInterval(intervalId);
	});

	const titl = title();

	data.subscribe((d) => {
		if (browser) titl.set(`Spotry ${d?.item?.name}`);
	});
</script>

{#if $data?.item}
	{@const { item } = $data}
	{@const img = getImages(item).at(0)}

	<div class="flex h-[100svh] flex-col items-center justify-evenly gap-24 px-24 md:flex-row">
		{#if img}
			<MainImg {img} isPaused={!$data.is_playing} />
			<BgImage {img} />
		{/if}

		{#if item.type === 'track' || item.type === undefined}
			<MetaData
				name={item.name || ''}
				releaseDate={item.album?.release_date || ''}
				artists={item.artists?.map((a) => ({ ...a, name: a.name || '' })) || []}
			/>
		{:else}
			<h1>Hi</h1>
		{/if}
	</div>
{/if}
