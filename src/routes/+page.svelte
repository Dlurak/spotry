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
	import { title, useIdle, useInterval } from 'nutzlich';

	const accessToken = svocal('accessToken');

	$: {
		if (!$accessToken && browser) goto('/login');
	}

	const data = writable<null | CurrentlyPlaying>(null);
	const lastUpdate = writable(0);

	const showMetadata = svocal('settings-showMetadata');

	const load = async () => {
		if (!$accessToken || document.hidden) return;

		const msSinceLastUpdate = new Date().getTime() - $lastUpdate;
		if (msSinceLastUpdate < 3_000) return;

		await getCurrentlyPlayingTrack({
			accessToken: $accessToken
		}).then(data.set);

		lastUpdate.set(new Date().getTime());
	};

	useInterval(load, 10_000);

	onMount(load);
	accessToken.subscribe(load);

	const titl = title();
	data.subscribe((d) => {
		titl.set(`Spotry ${d?.item?.name || ''}`);
	});

	const isIdle = useIdle(5_000);

	const hideCursor = svocal('settings-hideCursor');
</script>

<svelte:window
	on:focus={() => {
		load();
	}}
/>

{#if $data?.item}
	{@const { item } = $data}
	{@const img = getImages(item).at(0)}

	<div
		class="box-border flex h-[100svh] w-full cursor-[--cursor] items-center"
		style:--cursor={$isIdle && $hideCursor ? 'none' : 'unset'}
	>
		<div class="box-border flex h-2/3 w-full flex-col items-center px-6 md:flex-row md:gap-6">
			{#if img}
				<MainImg {img} isPaused={!$data.is_playing} />
				<BgImage {img} />
			{/if}

			{#if (item.type === 'track' || item.type === undefined) && $showMetadata}
				<MetaData
					name={item.name || ''}
					releaseDate={item.album?.release_date || ''}
					artists={item.artists?.map((a) => ({ ...a, name: a.name || '' })) || []}
				/>
			{/if}
		</div>
	</div>
{/if}
