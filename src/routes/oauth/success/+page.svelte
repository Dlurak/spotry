<script lang="ts">
	import type { PageData } from './$types';
	import { accessToken } from '$lib/spotify/accessToken';
	import { onMount } from 'svelte';
	import { svocal } from '$lib/svocal';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const accesstokenSvocal = svocal('accessToken');
	const accessTokenExpiresSvocal = svocal('accessTokenExpires');
	const refreshtokenSvocal = svocal('refreshToken');

	onMount(async () => {
		await accessToken({
			base64Encoded: data.base64,
			redirectUri: data.redirectUri,
			code: data.code
		})
			.then((data) => {
				const currentMillis = new Date().getTime();
				const currentSecs = Math.floor(currentMillis / 1_000);

				accesstokenSvocal.set(data.access_token);
				accessTokenExpiresSvocal.set(data.expires_in + currentSecs);
				refreshtokenSvocal.set(data.refresh_token);
			})
			.catch(() => {});

		setTimeout(() => {
			goto('/');
		}, 1_500);
	});
</script>

<div>Thx for accepting this in spotify {`<3`}</div>
