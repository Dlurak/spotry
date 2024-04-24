<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getCurrentlyPlayingTrack, type CurrentlyPlaying } from '$lib/spotify/player';
	import { svocal } from '$lib/svocal';
	import { nowInSeconds } from '$lib/utils/dates/convert';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import 'iconify-icon';
	import BgImage from '$lib/components/player/BgImage.svelte';
	import MetaData from '$lib/components/player/MetaData.svelte';
	import MainImg from '$lib/components/player/MainImg.svelte';

	const tokenExpires = svocal('accessTokenExpires');
	const accessToken = svocal('accessToken');

	$: isLoggedin = $tokenExpires > nowInSeconds() && $accessToken;

	$: {
		if (!isLoggedin && browser) {
			goto('/login');
		}
	}

	const data = writable<null | CurrentlyPlaying>(null);

	const load = () => {
		if (!$accessToken) return;
		if (document.hidden) return;

		getCurrentlyPlayingTrack({
			accessToken: $accessToken
		}).then(data.set);
	};

	onMount(() => {
		load();

		const intervalId = setInterval(load, 10_000);
		return () => clearInterval(intervalId);
	});
</script>

{#if $data?.item}
	{@const img = $data.item?.album?.images?.sort((a, b) => b.width - a.width).at(0)}

	<div class="flex h-[100svh] flex-col items-center justify-evenly gap-24 px-24 md:flex-row">
		{#if img}
			<MainImg {img} isPaused={!$data.is_playing} />
			<BgImage {img} />
		{/if}

		<MetaData
			name={$data.item.name}
			releaseDate={$data.item.album.release_date}
			artists={$data.item.artists}
		/>
	</div>
{/if}
