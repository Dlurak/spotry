import { redirect } from '@sveltejs/kit';
import { CLIENT_ID } from '$env/static/private';
import { randomString } from '$lib/utils/strings/random';
import { oauthStates } from '$lib/stores';

export function GET({ request }: { request: Request }) {
	const ownUrl = new URL(request.url);

	const scopes = ["user-read-currently-playing", "user-read-playback-state"] satisfies string[];
	const redirectUri = `${ownUrl.origin}/callback/`;
	const state = randomString(16);

	oauthStates.update((old) => [...old, state])

	const options = {
		response_type: 'code',
		client_id: CLIENT_ID,
		scope: scopes.join(' '),
		redirect_uri: redirectUri,
		state
	};

	const url =
		'https://accounts.spotify.com/authorize?' +
		Object.entries(options)
			.map(([key, value]) => `${key}=${(value)}`)
			.join('&');

	throw redirect(308, url);
}
