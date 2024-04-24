<script lang="ts">
	import { newAccessToken } from '$lib/spotify/accessToken';
	import { svocal } from '$lib/svocal';
	import { nowInSeconds } from '$lib/utils/dates/convert';
	import type { PageData } from './$types';

	export let data: PageData;

	const accessTokenExpires = svocal('accessTokenExpires');
	const accessToken = svocal('accessToken');
	const refreshToken = svocal('refreshToken');

	$: secondsUntilAccessTokenExpires = nowInSeconds() - $accessTokenExpires;

	setTimeout(
		() => {
			if (!$refreshToken) return;

			newAccessToken({
				refreshToken: $refreshToken,
				base64Encoded: data.base64
			}).then(data => {
					accessToken.set(data.access_token)
					accessTokenExpires.set(nowInSeconds() + data.expires_in)
			});
		},
		// 20 second before the token expires we try to get a new one
		Math.max(0, secondsUntilAccessTokenExpires - 20)
	);
</script>

<h1>Spotry</h1>

<span>A better frontend for Spotify</span>
