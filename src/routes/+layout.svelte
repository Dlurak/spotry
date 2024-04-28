<script lang="ts">
	import { newAccessToken } from '$lib/spotify/accessToken';
	import { svocal } from '$lib/svocal';
	import { nowInSeconds } from '$lib/utils/dates/convert';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const msToSec = 1_000_000;

	const accessTokenExpires = svocal('accessTokenExpires');
	const accessToken = svocal('accessToken');
	const refreshToken = svocal('refreshToken');

	$: secondsUntilAccessTokenExpires = nowInSeconds() - $accessTokenExpires;

	const refresh = async () => {
		if (!$refreshToken) return;

		await newAccessToken({
			refreshToken: $refreshToken,
			base64Encoded: data.base64
		}).then((data) => {
			accessToken.set(data.access_token);
			accessTokenExpires.set(nowInSeconds() + data.expires_in);
		});

		setTimeout(refresh, ($accessTokenExpires - 20) * msToSec);
	};

	// 20 second before the token expires we try to get a new one
	setTimeout(refresh, Math.max(0, secondsUntilAccessTokenExpires - 20) * msToSec);
</script>

<slot />
