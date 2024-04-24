<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getCurrentlyPlayingTrack, type CurrentlyPlaying } from '$lib/spotify/player';
	import { svocal } from '$lib/svocal';
	import { nowInSeconds } from '$lib/utils/dates/convert';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import 'iconify-icon';

	const tokenExpires = svocal('accessTokenExpires');
	const accessToken = svocal('accessToken');

	$: isLoggedin = $tokenExpires > nowInSeconds() && $accessToken;

	$: {
		if (!isLoggedin && browser) {
			goto('/login');
		}
	}

	const data = writable<null | CurrentlyPlaying>(null);

	// TODO: real isIdle
	const isIdle = false;

	onMount(() => {
		const func = () => {
			if (!$accessToken) return;

			if (!isIdle)
				getCurrentlyPlayingTrack({
					accessToken: $accessToken
				}).then(data.set);
		};

		func();
		const intervalId = setInterval(func, 10_000);

		return () => clearInterval(intervalId);
	});
</script>

{#if $data?.item}
	{@const img = $data.item?.album?.images?.sort((a, b) => b.width - a.width).at(0)}
	<div class="flex h-[100svh] items-center justify-evenly gap-24 px-24">
		{#if img}
			<div>
				<div class="z-50">
					<img
						src={img.url}
						width={img.width}
						height={img.height}
						class="rounded-lg shadow-2xl"
						alt="The album cover"
					/>
				</div>
				<img
					src={img.url}
					width={img.width}
					height={img.height}
					alt="The album cover"
					class="fixed bottom-0 left-0 right-0 top-0 -z-50 h-full w-full object-cover opacity-100 blur-3xl brightness-75"
				/>
			</div>
		{/if}
		<div>
			<h2 class="prose text-5xl font-semibold leading-tight text-white">{$data.item?.name}</h2>
			<span class="flex gap-4 text-xl leading-loose">
				<span class="flex items-center gap-1">
					<iconify-icon icon="zondicons:time" />
					{new Date($data.item.album.release_date).toLocaleDateString()}
				</span>
				{#each $data.item?.artists || [] as artist}
					<span>
						{artist.name}
					</span>
				{/each}
			</span>
		</div>
	</div>
{/if}
