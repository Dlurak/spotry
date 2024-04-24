<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getCurrentlyPlayingTrack } from '$lib/spotify/player';
	import { svocal } from '$lib/svocal';
	import { nowInSeconds } from '$lib/utils/dates/convert';
	import { get } from 'svelte/store';

	const tokenExpires = svocal('accessTokenExpires');
	const accessToken = svocal('accessToken');

	$: isLoggedin = $tokenExpires > nowInSeconds() && $accessToken;

	$: {
		if (!isLoggedin && browser) {
			goto('/');
		}
	}

	const load = async (accessToken: string | null) => {
		if (!accessToken) return;

		return await getCurrentlyPlayingTrack({
			accessToken
		});
	};
</script>

{#await load(get(accessToken)) then data}
	{@const img = data?.item?.album?.images?.sort((a, b) => b.width - a.height).at(0)}
	{#if img}
		<div>
			<div class="z-50 ">
				<img src={img.url} width={img.width} height={img.height} alt="The album cover" />
			</div>
			<img
				src={img.url}
				width={img.width}
				height={img.height}
				alt="The album cover"
				class="fixed bottom-0 left-0 right-0 top-0 h-full w-full object-cover opacity-100 blur-3xl brightness-75 -z-50"
			/>
		</div>
	{/if}
{/await}
